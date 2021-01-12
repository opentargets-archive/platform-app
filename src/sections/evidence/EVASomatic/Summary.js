import React from 'react';
import { gql } from '@apollo/client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const EVA_SOMATIC_SUMMARY = gql`
  fragment evaSomaticSummary on Disease {
    evaSomaticSummary: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["eva_somatic"]
      size: 0
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(EVA_SOMATIC_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ evaSomaticSummary }) => {
        const { count } = evaSomaticSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
    />
  );
}

Summary.fragments = {
  evaSomaticSummary: EVA_SOMATIC_SUMMARY,
};

export default Summary;
