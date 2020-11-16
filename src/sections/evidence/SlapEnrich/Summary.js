import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SLAPENRICH_SUMMARY_FRAGMENT = gql`
  fragment SlapEnrichSummaryFragment on Disease {
    slapEnrich: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["slapenrich"]
      size: 0
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(SLAPENRICH_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.slapEnrich.count} entr${
          data.slapEnrich.count === 1 ? 'y' : 'ies'
        }`
      }
    />
  );
}

Summary.fragments = {
  SlapEnrichSummaryFragment: SLAPENRICH_SUMMARY_FRAGMENT,
};

export default Summary;
