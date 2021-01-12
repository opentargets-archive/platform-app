import React from 'react';
import { gql } from '@apollo/client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const CLINGEN_SUMMARY_FRAGMENT = gql`
  fragment ClinGenSummaryFragment on Disease {
    clingenSummary: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["clingen"]
      size: 0
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(CLINGEN_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ clingenSummary }) => {
        const { count } = clingenSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
    />
  );
}

Summary.fragments = {
  ClinGenSummaryFragment: CLINGEN_SUMMARY_FRAGMENT,
};

export default Summary;
