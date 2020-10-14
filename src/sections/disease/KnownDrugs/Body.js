import React from 'react';
import { gql } from '@apollo/client';

import { Body as KnownDrugsBody } from '../../common/KnownDrugs';
import Description from './Description';

const KNOWN_DRUGS_BODY_QUERY = gql`
  query KnownDrugsQuery(
    $efoId: String!
    $cursor: [String!]
    $freeTextQuery: String
    $size: Int = 10
  ) {
    disease(efoId: $efoId) {
      id
      knownDrugs(cursor: $cursor, freeTextQuery: $freeTextQuery, size: $size) {
        count
        cursor
        rows {
          phase
          status
          urls {
            name
            url
          }
          disease {
            id
            name
          }
          drug {
            id
            name
          }
          drugType
          mechanismOfAction
          activity
          target {
            id
            approvedName
            approvedSymbol
          }
        }
      }
    }
  }
`;

function Body({ id: efoId, definition }) {
  return (
    <KnownDrugsBody
      definition={definition}
      efoId={efoId}
      BODY_QUERY={KNOWN_DRUGS_BODY_QUERY}
      Description={Description}
      columnsToShow={['disease', 'drug', 'target', 'clinicalTrials']}
      stickyColumn="drug"
    />
  );
}

export default Body;
