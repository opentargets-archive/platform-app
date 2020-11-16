import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const INTOGEN_SUMMARY_FRAGMENT = gql`
  fragment IntOgenSummaryFragment on Disease {
    intOgen: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["intogen"]
      size: 0
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(INTOGEN_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.intOgen.count} entr${data.intOgen.count === 1 ? 'y' : 'ies'}`
      }
    />
  );
}

Summary.fragments = {
  IntOgenSummaryFragment: INTOGEN_SUMMARY_FRAGMENT,
};

export default Summary;
