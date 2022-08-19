import React from 'react';
import { loader } from 'graphql.macro';

import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const INDICATIONS_SUMMARY_FRAGMENT = loader('./IndicationsSummaryFragment.gql');

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
