import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const RELATED_TARGETS_SUMMARY_FRAGMENT = gql`
  fragment RelatedTargetsSummaryFragment on Target {
    relatedTargets {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(RELATED_TARGETS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => (
        <>
          {data.relatedTargets.count} targets
          <br />
          (through shared diseases)
        </>
      )}
    />
  );
}

Summary.fragments = {
  RelatedTargetsSummaryFragment: RELATED_TARGETS_SUMMARY_FRAGMENT,
};

export default Summary;
