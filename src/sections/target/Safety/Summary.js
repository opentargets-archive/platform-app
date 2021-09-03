import React from 'react';
import { loader } from 'graphql.macro';
import _ from 'lodash';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SAFETY_SUMMARY_FRAGMENT = loader('./summaryQuery.gql');

function Summary({ definition }) {
  const request = usePlatformApi(SAFETY_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => {
        const uniqueEvents = _.uniqBy(data.safetyLiabilities, 'event');
        return `${uniqueEvents.length} unique safety events`;
      }}
    />
  );
}

Summary.fragments = {
  SafetySummaryFragment: SAFETY_SUMMARY_FRAGMENT,
};

export default Summary;
