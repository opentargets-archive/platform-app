import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const EXPRESSION_SUMMARY_FRAGMENT = loader('./ExpressionSummary.gql');

function Summary({ definition }) {
  const request = usePlatformApi(EXPRESSION_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => {
        const hasRNA = request.data.expressions.some(d => d.rna.level >= 0);
        const hasProtein = request.data.expressions.some(
          d => d.protein.level >= 0
        );
        const expressionTypes = [];

        if (hasRNA) {
          expressionTypes.push('RNA');
        }

        if (hasProtein) {
          expressionTypes.push('Protein');
        }

        return expressionTypes.join(' • ');
      }}
    />
  );
}

Summary.fragments = {
  ExpressionSummaryFragment: EXPRESSION_SUMMARY_FRAGMENT,
};

export default Summary;
