import React from 'react';
import { loader } from 'graphql.macro';
import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { dataTypesMap } from '../../../dataTypes';

const PHENODIGM_SUMMARY_FRAGMENT = loader('./PhenodigmSummaryFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(PHENODIGM_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.phenodigm.count} entr${
          data.phenodigm.count === 1 ? 'y' : 'ies'
        }`
      }
      subText={dataTypesMap.animal_model}
    />
  );
}

Summary.fragments = {
  PhenodigmSummaryFragment: PHENODIGM_SUMMARY_FRAGMENT,
};

export default Summary;
