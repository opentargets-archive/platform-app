import React from 'react';
import { gql } from '@apollo/client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const UNIPROT_VARIANTS_SUMMARY = gql`
  fragment UniprotVariantsSummary on Disease {
    uniprotVariantsSummary: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["uniprot_variants"]
      size: 0
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(UNIPROT_VARIANTS_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ uniprotVariantsSummary }) => {
        const { count } = uniprotVariantsSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
    />
  );
}

Summary.fragments = {
  UniprotVariantsSummary: UNIPROT_VARIANTS_SUMMARY,
};

export default Summary;
