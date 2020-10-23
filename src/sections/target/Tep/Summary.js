import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const TEP_SUMMARY_FRAGMENT = gql`
  fragment TepSummaryFragment on Target {
    id
    tep {
      uri
      name
    }
  }
`;

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
