import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const EUROPE_PMC_SUMMARY_FRAGMENT = gql`
  fragment EuropePmcSummaryFragment on Disease {
    europePmc: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["europepmc"]
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(EUROPE_PMC_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.europePmc.count} entr${
          data.europePmc.count === 1 ? 'y' : 'ies'
        }`
      }
    />
  );
}

Summary.fragments = {
  EuropePmcSummaryFragment: EUROPE_PMC_SUMMARY_FRAGMENT,
};

export default Summary;
