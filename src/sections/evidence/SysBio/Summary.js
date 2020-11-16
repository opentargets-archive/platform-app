import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SYSBIO_SUMMARY_FRAGMENT = gql`
  fragment SysBioSummaryFragment on Disease {
    sysBio: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["sysbio"]
      size: 0
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(SYSBIO_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.sysBio.count} entr${data.sysBio.count === 1 ? 'y' : 'ies'}`
      }
    />
  );
}

Summary.fragments = {
  SysBioSummaryFragment: SYSBIO_SUMMARY_FRAGMENT,
};

export default Summary;
