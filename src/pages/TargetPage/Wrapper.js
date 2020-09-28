import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import ClassicAssociationsBubbles from './ClassicAssociationsBubbles';
import { client3 } from '../../client';

const therapeuticAreasURL =
  'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/therapeutic_area.txt';
const efoURL =
  'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/diseases_efo.jsonl';

const BUBBLES_QUERY = gql`
  query BubblesQuery($ensemblId: String!, $index: Int!, $size: Int!) {
    target(ensemblId: $ensemblId) {
      associatedDiseases(page: { index: $index, size: $size }) {
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

const dts = [
  'TEXT_MINING',
  'DIFFERENTIAL_EXPRESSION',
  'GENETIC_ASSOCIATION',
  'SOMATIC_MUTATION',
  'KNOWN_DRUGS',
  'ANIMAL_MODELS',
  'PATHWAYS',
];

const dataTypeMap = {
  GENETIC_ASSOCIATION: 'genetic_association',
  SOMATIC_MUTATION: 'somatic_mutation',
  KNOWN_DRUGS: 'known_drug',
  PATHWAYS: 'affected_pathway',
  DIFFERENTIAL_EXPRESSION: 'rna_expression',
  TEXT_MINING: 'literature',
  ANIMAL_MODELS: 'animal_model',
};

function Wrapper({ ensemblId, symbol, Component }) {
  const [nodes, setNodes] = useState();
  const [associations, setAssociations] = useState();
  const [therapeuticAreas, setTherapeuticAreas] = useState();

  useEffect(
    () => {
      const promises = [
        fetch(therapeuticAreasURL).then(res => res.text()),
        fetch(efoURL).then(res => res.text()),
        client3.query({
          query: BUBBLES_QUERY,
          variables: {
            ensemblId,
            index: 0,
            size: 2000,
          },
        }),
      ];
      Promise.all(promises).then(data => {
        const nodes = data[1]
          .trim()
          .split('\n')
          .map(JSON.parse);

        nodes.push({ id: 'EFO_ROOT', name: 'root', parentIds: [] });
        setAssociations(data[2].data.target.associatedDiseases.rows);
        setTherapeuticAreas(data[0].trim().split('\n'));
        setNodes(nodes);
      });
    },
    [ensemblId]
  );

  if (!nodes || !associations || !therapeuticAreas) {
    return null;
  }

  // make sure that every therapeutic area has as parent the root node
  const efoNodes = nodes.map(node => {
    const newNode = {
      ...node,
    };

    if (therapeuticAreas.includes(node.id)) {
      newNode.parentIds = ['EFO_ROOT'];
    }

    return newNode;
  });

  const efo = {
    nodes: efoNodes,
    therapeuticAreas,
  };

  const rows = associations.map(assoc => {
    return {
      data: {
        id: assoc.disease.id,
        name: assoc.disease.name,
        score: assoc.score,
        target: {
          ensgId: ensemblId,
        },
      },
      disease: assoc.disease,
      score: assoc.score,
      scoresByDataType: dts.map(dt => {
        const scoreObj = assoc.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === dataTypeMap[dt]
        );
        return {
          dataTypeId: dt,
          score: scoreObj === undefined ? 0 : scoreObj.score,
        };
      }),
    };
  });

  return (
    <Component
      ensgId={ensemblId}
      symbol={symbol}
      data={rows}
      efo={efo}
      selectedTherapeuticAreas={[]}
    />
  );
}

export default Wrapper;
