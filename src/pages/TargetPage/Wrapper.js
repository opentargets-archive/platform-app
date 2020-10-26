import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import useBatchDownloader from '../../hooks/useBatchDownloader';

const therapeuticAreasURL =
  'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/therapeutic_area.txt';
const efoURL =
  'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/diseases_efo.jsonl';

const ASSOCIATIONS_QUERY = gql`
  query AssociationsQuery(
    $ensemblId: String!
    $index: Int!
    $size: Int!
    $aggregationFilters: [AggregationFilter!]
  ) {
    target(ensemblId: $ensemblId) {
      id
      associatedDiseases(
        page: { index: $index, size: $size }
        aggregationFilters: $aggregationFilters
      ) {
        count
        rows {
          disease {
            id
            name
          }
          score
          datatypeScores {
            componentId: id
            score
          }
        }
      }
    }
  }
`;

function Wrapper({ ensemblId, symbol, Component, aggregationFilters }) {
  const [nodes, setNodes] = useState();
  const [associations, setAssociations] = useState();
  const [therapeuticAreas, setTherapeuticAreas] = useState();

  const getAllAssociations = useBatchDownloader(
    ASSOCIATIONS_QUERY,
    { ensemblId, aggregationFilters },
    'data.target.associatedDiseases'
  );

  useEffect(
    () => {
      const promises = [
        fetch(therapeuticAreasURL).then(res => res.text()),
        fetch(efoURL).then(res => res.text()),
        getAllAssociations(),
      ];
      Promise.all(promises).then(data => {
        const nodes = data[1]
          .trim()
          .split('\n')
          .map(JSON.parse);

        setAssociations(data[2]);
        setTherapeuticAreas(data[0].trim().split('\n'));
        setNodes(nodes);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ensemblId, aggregationFilters]
  );

  if (!nodes || !associations || !therapeuticAreas) {
    return null;
  }

  return (
    <Component
      ensgId={ensemblId}
      symbol={symbol}
      therapeuticAreas={therapeuticAreas}
      efo={nodes}
      associations={associations}
    />
  );
}

export default Wrapper;
