import React from 'react';
import { loader } from 'graphql.macro';

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
        const safetyDataTypes = [
          {
            id: 'adverseEffects',
            label: 'Known effects',
          },
          {
            id: 'safetyRiskInfo',
            label: 'Risk info',
          },
          {
            id: 'experimentalToxicity',
            label: 'Non-clinical toxicity',
          },
        ];

        return safetyDataTypes
          .filter(d => data.safety[d.id].length > 0)
          .map(d => d.label)
          .join(' • ');
      }}
    />
  );
}

Summary.fragments = {
  SafetySummaryFragment: SAFETY_SUMMARY_FRAGMENT,
};

export default Summary;
