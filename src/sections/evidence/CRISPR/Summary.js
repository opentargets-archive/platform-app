import React from 'react';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const CRISPR_SUMMARY = loader('./CrisprSummary.gql');

function Summary({ definition }) {
  const request = usePlatformApi(CRISPR_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ crisprSummary }) => {
        const { count } = crisprSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
      chipText="Pathways & sys bio"
    />
  );
}

Summary.fragments = {
  crisprSummary: CRISPR_SUMMARY,
};

export default Summary;
