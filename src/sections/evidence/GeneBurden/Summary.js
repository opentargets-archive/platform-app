import React from 'react';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';

const GENE_BURDEN_SUMMARY = loader('./GeneBurdenSummary.gql');

function Summary({ definition }) {
  const request = usePlatformApi(GENE_BURDEN_SUMMARY);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ geneBurdenSummary }) => {
        const { count } = geneBurdenSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
      subText={dataTypesMap.genetic_association}
    />
  );
}

Summary.fragments = {
  geneBurdenSummary: GENE_BURDEN_SUMMARY,
};

export default Summary;
