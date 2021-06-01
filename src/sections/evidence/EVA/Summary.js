import React from 'react';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const EVA_SUMMARY = loader('./EVASummaryQuery.gql');

function Summary({ definition }) {
  const request = usePlatformApi(EVA_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ evaSummary }) => {
        const { count } = evaSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
      chipText="Genetic Associations"
    />
  );
}

Summary.fragments = {
  evaSummary: EVA_SUMMARY,
};

export default Summary;
