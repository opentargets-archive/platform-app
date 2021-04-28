import React from 'react';
import { gql } from '@apollo/client';

import { Body as Bibliography } from '../../common/SimilarEntities';

const DRUGS_LITERATURE_OCURRENCES = gql`
  query SimilarEntitiesQuery(
    $id: String!
    $ids: [String!] = []
    $threshold: Float = 0.5
    $size: Int! = 15
    $entityNames: [String!] = []
    $cursor: String! = ""
  ) {
    drug(chemblId: $id) {
      id
      name
      similarEntities(
        additionalIds: $ids
        threshold: $threshold
        size: $size
        entityNames: $entityNames
      ) {
        score
        object {
          ... on Target {
            id
            approvedSymbol
          }
          ... on Drug {
            id
            name
          }
          ... on Disease {
            id
            name
          }
        }
      }
      literatureOcurrences(additionalIds: $ids, cursor: $cursor) {
        count
        cursor
        rows {
          pmid
          pmcid
          publicationDate
          sentences {
            section
            matches {
              mappedId
              matchedLabel
              sectionStart
              sectionEnd
              startInSentence
              endInSentence
            }
          }
        }
      }
    }
  }
`;

function Body({ definition, id, label: name }) {
  return (
    <Bibliography
      definition={definition}
      entity="drug"
      id={id}
      name={name}
      BODY_QUERY={DRUGS_LITERATURE_OCURRENCES}
    />
  );
}

export default Body;
