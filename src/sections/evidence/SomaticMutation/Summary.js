import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';
import usePlatformApi from '../../../hooks/usePlatformApi';


const SOMATIC_MUTATION_SUMMARY = loader('./SomaticMutationSummary.gql')

function Summary({ definition }) {
  // Made up request/response until Graph Query Api is ready
  let request = {
    data: { somaticMutationSummary: { count: 10} }, loading: false, error: false,
  }

  request = usePlatformApi(SOMATIC_MUTATION_SUMMARY);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={(data) => {
        const hasData = definition.hasData(data);
        return  hasData ? 'Available' : 'no data';
      }}
      subText={dataTypesMap.somatic_mutation}
    />
  );
}

Summary.fragments = {
  somaticMutationSummary: SOMATIC_MUTATION_SUMMARY,
};


export default Summary;
