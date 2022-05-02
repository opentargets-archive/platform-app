import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const PROTVISTA_SUMMARY_FRAGMENT = loader('./summaryQuery.gql');

function Summary({ definition }) {
  const request = usePlatformApi(PROTVISTA_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={() => 'Positional, Structural and Functional Information'}
    />
  );
}

Summary.fragments = {
  ProtVistaSummaryFragment: PROTVISTA_SUMMARY_FRAGMENT,
};

export default Summary;
