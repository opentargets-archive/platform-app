import React from 'react';
import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';

function Summary({ definition }) {
  // Made up request/response until Graph Query Api is ready
  const request = {
    data: { somaticMutationSummary: { count: 10} }, loading: false, error: false,
  }

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ somaticMutationSummary }) => {
        const { count } = somaticMutationSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
      subText={dataTypesMap.somatic_mutation}
    />
  );
}

export default Summary;
