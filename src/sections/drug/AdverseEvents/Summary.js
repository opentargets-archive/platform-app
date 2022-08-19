import React from 'react';
import { loader } from 'graphql.macro';

import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const ADVERSE_EVENTS_SUMMARY_FRAGMENT = loader(
  './AdverseEventsSummaryFragment.gql'
);

function Summary({ definition }) {
  const request = usePlatformApi(ADVERSE_EVENTS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.adverseEvents.count} adverse event${
          data.adverseEvents.count !== 1 ? 's' : ''
        }`
      }
    />
  );
}

Summary.fragments = {
  AdverseEventsSummaryFragment: ADVERSE_EVENTS_SUMMARY_FRAGMENT,
};

export default Summary;
