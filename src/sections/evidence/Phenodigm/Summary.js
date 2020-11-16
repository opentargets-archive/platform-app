import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const PHENODIGM_SUMMARY_FRAGMENT = gql`
  fragment PhenodigmSummaryFragment on Disease {
    phenodigm: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["phenodigm"]
      size: 0
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(PHENODIGM_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.phenodigm.count} entr${
          data.phenodigm.count === 1 ? 'y' : 'ies'
        }`
      }
    />
  );
}

Summary.fragments = {
  PhenodigmSummaryFragment: PHENODIGM_SUMMARY_FRAGMENT,
};

export default Summary;
