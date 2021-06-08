import React from 'react';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';

const EXPRESSION_ATLAS_SUMMARY = loader('./ExpressionAtlasSummary.gql');

function Summary({ definition }) {
  const request = usePlatformApi(EXPRESSION_ATLAS_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ expressionAtlasSummary }) => {
        const { count } = expressionAtlasSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
      subText={dataTypesMap.rna_expression}
    />
  );
}

Summary.fragments = {
  expressionAtlasSummary: EXPRESSION_ATLAS_SUMMARY,
};

export default Summary;
