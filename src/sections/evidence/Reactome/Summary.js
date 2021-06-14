import React from 'react';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';

const REACTOME_SUMMARY = loader('./ReactomeSummary.gql');

function Summary({ definition }) {
  const request = usePlatformApi(REACTOME_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ reactomeSummary }) => {
        const { count } = reactomeSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
      subText={dataTypesMap.affected_pathway}
    />
  );
}

Summary.fragments = {
  reactomeSummary: REACTOME_SUMMARY,
};

export default Summary;
