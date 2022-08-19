import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SOMATIC_ALTERATIONS_SUMMARY = loader('./SomaticAlterationsSummary.gql')

function Summary({ definition }) {
  const request = usePlatformApi(SOMATIC_ALTERATIONS_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={(data) => {
        const hasData = definition.hasData(data);
        return  hasData ? 'Available' : 'no data';
      }}
    />
  );
}

Summary.fragments = {
  targetSomaticAlterationsSummary: SOMATIC_ALTERATIONS_SUMMARY,
};

export default Summary;
