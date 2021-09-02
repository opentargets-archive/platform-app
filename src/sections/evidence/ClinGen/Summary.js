import React from 'react';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';

const CLINGEN_SUMMARY_FRAGMENT = loader('./ClinGenSummaryFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(CLINGEN_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ clingenSummary }) => {
        const { count } = clingenSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
      subText={dataTypesMap.genetic_association}
    />
  );
}

Summary.fragments = {
  ClinGenSummaryFragment: CLINGEN_SUMMARY_FRAGMENT,
};

export default Summary;
