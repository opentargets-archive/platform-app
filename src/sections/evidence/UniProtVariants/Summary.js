import React from 'react';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';
import { loader } from 'graphql.macro';

const UNIPROT_VARIANTS_SUMMARY = loader('./UniprotVariantsSummaryQuery.gql');

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
