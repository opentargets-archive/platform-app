import React from 'react';
import { gql } from '@apollo/client';

import { Body as Bibliography } from '../../common/SimilarEntities';

const SIMILARENTITIES_BODY_QUERY = gql`
  query SimilarEntitiesQuery(
    $efoId: String!
    $ids: [String!] = []
    $threshold: Float = 0.5
    $size: Int! = 15
    $entityNames: [String!] = []
    $cursor: String! = ""
  ) {
    disease(efoId: $efoId) {
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
          ids
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
          ocurrencesPerId {
            keywordId
            count
          }
        }
      }
    }
  }
`;

function Body({ definition, id: efoId, label: name }) {
  return (
    <Bibliography
      definition={definition}
      entity="disease"
      efoId={efoId}
      name={name}
      BODY_QUERY={SIMILARENTITIES_BODY_QUERY}
    />
  );
}

export default Body;
