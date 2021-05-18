import React from 'react';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const UNIPROT_LITERATURE_SUMMARY = loader('./UniprotLiteratureSummary.gql');

function Summary({ definition }) {
  const request = usePlatformApi(UNIPROT_LITERATURE_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ uniprotLiteratureSummary }) => {
        const { count } = uniprotLiteratureSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
    />
  );
}

Summary.fragments = {
  UniprotLiteratureSummary: UNIPROT_LITERATURE_SUMMARY,
};

export default Summary;
