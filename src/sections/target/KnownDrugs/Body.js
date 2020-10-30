import React from 'react';
import { gql } from '@apollo/client';

import { Body as KnownDrugsBody } from '../../common/KnownDrugs';
import Description from './Description';

const KNOWN_DRUGS_BODY_QUERY = gql`
  query KnownDrugsQuery(
    $ensgId: String!
    $cursor: [String!]
    $freeTextQuery: String
    $size: Int = 10
  ) {
    target(ensemblId: $ensgId) {
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
        }
      }
    }
  }
`;

function Body({ definition, id: ensgId, label: symbol }) {
  return (
    <KnownDrugsBody
      definition={definition}
      entity="target"
      variables={{ ensgId }}
      BODY_QUERY={KNOWN_DRUGS_BODY_QUERY}
      Description={() => <Description symbol={symbol} />}
      columnsToShow={['drug', 'disease', 'clinicalTrials']}
      stickyColumn="drug"
    />
  );
}

export default Body;
