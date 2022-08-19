import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const PATHWAYS_SUMMARY_FRAGMENT = loader('./PathwaysSummary.gql');

function Summary({ definition }) {
  const request = usePlatformApi(PATHWAYS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ pathways }) => `${pathways.length} Reactome pathways`}
    />
  );
}

Summary.fragments = {
  PathwaysSummaryFragment: PATHWAYS_SUMMARY_FRAGMENT,
};

export default Summary;
