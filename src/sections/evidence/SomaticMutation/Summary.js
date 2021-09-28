import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SOMATIC_MUTATION_SUMMARY = loader('./SomaticMutationSummary.gql')

function Summary({ definition }) {
  const request = usePlatformApi(SOMATIC_MUTATION_SUMMARY);
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
  evidenceSomaticMutationSummary: SOMATIC_MUTATION_SUMMARY,
};

export default Summary;
