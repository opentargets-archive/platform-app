import React from 'react';
import { gql } from '@apollo/client';

import { Body as KnownDrugsBody } from '../../common/KnownDrugs';
import Description from './Description';

const KNOWN_DRUGS_BODY_QUERY = gql`
  query KnownDrugsQuery(
    $chemblId: String!
    $cursor: String
    $freeTextQuery: String
    $size: Int = 10
  ) {
    drug(chemblId: $chemblId) {
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

function Body({ definition, id: chemblId, label: name }) {
  return (
    <KnownDrugsBody
      definition={definition}
      entity="drug"
      variables={{ chemblId }}
      BODY_QUERY={KNOWN_DRUGS_BODY_QUERY}
      Description={() => <Description name={name} />}
      columnsToShow={['disease', 'target', 'clinicalTrials']}
      stickyColumn="disease"
    />
  );
}

export default Body;
