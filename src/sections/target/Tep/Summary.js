import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const TEP_SUMMARY_FRAGMENT = loader('./TepSummaryFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(TEP_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={() => 'Available'}
    />
  );
}

Summary.fragments = {
  TepSummaryFragment: TEP_SUMMARY_FRAGMENT,
};

export default Summary;
