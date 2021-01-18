import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import useBatchDownloader from '../../hooks/useBatchDownloader';

const efoURL =
  'https://storage.googleapis.com/open-targets-data-releases/beta-rewrite/static/ontology/diseases_efo.jsonl';

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

  const getAllAssociations = useBatchDownloader(
    ASSOCIATIONS_QUERY,
    { ensemblId, aggregationFilters },
    'data.target.associatedDiseases'
  );

  useEffect(
    () => {
      const promises = [
        fetch(efoURL).then(res => res.text()),
        getAllAssociations(),
      ];
      Promise.all(promises).then(data => {
        const nodes = data[0]
          .trim()
          .split('\n')
          .map(JSON.parse);
        setNodes(nodes);
        setAssociations(data[1]);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ensemblId, aggregationFilters]
  );

  if (!nodes || !associations) {
    return null;
  }

  const idToDisease = nodes.reduce((acc, disease) => {
    acc[disease.id] = disease;
    return acc;
  }, {});

  return (
    <Component
      ensemblId={ensemblId}
      symbol={symbol}
      idToDisease={idToDisease}
      associations={associations}
    />
  );
}

export default Wrapper;
