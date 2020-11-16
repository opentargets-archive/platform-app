import React from 'react';
import { gql } from '@apollo/client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const EXPRESSION_ATLAS_SUMMARY = gql`
  fragment expressionAtlasSummary on Disease {
    expressionAtlasSummary: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["expression_atlas"]
      size: 0
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(EXPRESSION_ATLAS_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ expressionAtlasSummary }) => {
        const { count } = expressionAtlasSummary;
        return `${count} record${count > 1 ? 's' : ''}`;
      }}
    />
  );
}

Summary.fragments = {
  expressionAtlasSummary: EXPRESSION_ATLAS_SUMMARY,
};

export default Summary;
