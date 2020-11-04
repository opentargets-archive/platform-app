import React from 'react';
import { gql } from '@apollo/client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const UNIPROT_LITERATURE_SUMMARY = gql`
  fragment UniprotLiteratureSummary on Disease {
    uniprotLiteratureSummary: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["uniprot_literature"]
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(UNIPROT_LITERATURE_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ uniprotLiteratureSummary }) => {
        const { count } = uniprotLiteratureSummary;
        return count > 0 ? 'known variants' : null;
      }}
    />
  );
}

Summary.fragments = {
  UniprotLiteratureSummary: UNIPROT_LITERATURE_SUMMARY,
};

export default Summary;
