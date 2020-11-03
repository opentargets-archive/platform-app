import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const OPEN_TARGETS_GENETICS_SUMMARY_FRAGMENT = gql`
  fragment OpenTargetsGeneticsSummaryFragment on Disease {
    openTargetsGenetics: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["ot_genetics_portal"]
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(OPEN_TARGETS_GENETICS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.openTargetsGenetics.count} entr${
          data.openTargetsGenetics.count === 1 ? 'y' : 'ies'
        }`
      }
    />
  );
}

Summary.fragments = {
  OpenTargetsGeneticsSummaryFragment: OPEN_TARGETS_GENETICS_SUMMARY_FRAGMENT,
};

export default Summary;
