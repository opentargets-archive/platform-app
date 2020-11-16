import React from 'react';
import { gql } from '@apollo/client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const EVA_SUMMARY = gql`
  fragment evaSummary on Disease {
    evaSummary: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["eva"]
      size: 0
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(EVA_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ evaSummary }) => {
        const { count } = evaSummary;
        return `${count} variant${count > 1 ? 's' : ''}`;
      }}
    />
  );
}

Summary.fragments = {
  evaSummary: EVA_SUMMARY,
};

export default Summary;
