import React from 'react';
import { gql } from '@apollo/client';

import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const INDICATIONS_SUMMARY_FRAGMENT = gql`
  fragment IndicationsSummaryFragment on Drug {
    indications {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(INDICATIONS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.indications.count} indication${
          data.indications.count !== 1 ? 's' : ''
        }`
      }
    />
  );
}

Summary.fragments = {
  IndicationsSummaryFragment: INDICATIONS_SUMMARY_FRAGMENT,
};

export default Summary;
