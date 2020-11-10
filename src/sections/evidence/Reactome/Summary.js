import React from 'react';
import { gql } from '@apollo/client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const REACTOME_SUMMARY = gql`
  fragment reactomeSummary on Disease {
    reactomeSummary: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["reactome"]
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(REACTOME_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ reactomeSummary }) => {
        const { count } = reactomeSummary;
        return `${count} pathway${count > 1 ? 's' : ''}`;
      }}
    />
  );
}

Summary.fragments = {
  reactomeSummary: REACTOME_SUMMARY,
};

export default Summary;
