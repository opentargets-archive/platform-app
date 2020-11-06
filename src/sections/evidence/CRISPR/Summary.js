import React from 'react';
import { gql } from '@apollo/client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const CRISPR_SUMMARY = gql`
  fragment crisprSummary on Disease {
    crisprSummary: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["crispr"]
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(CRISPR_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ crisprSummary }) => {
        const { count } = crisprSummary;
        return `${count} variant${count > 1 ? 's' : ''}`;
      }}
    />
  );
}

Summary.fragments = {
  crisprSummary: CRISPR_SUMMARY,
};

export default Summary;

// const Summary = ({ hasCrispr }) =>
//   hasCrispr ? 'CRISPR screen prioritised' : null;

// export default Summary;
