import React from 'react';
import { loader } from 'graphql.macro';
import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { dataTypesMap } from '../../../dataTypes';

const IMCP_SUMMARY_FRAGMENT = loader('./IMCPSummaryFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(IMCP_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.impc.count} entr${data.impc.count === 1 ? 'y' : 'ies'}`
      }
      subText={dataTypesMap.animal_model}
    />
  );
}

Summary.fragments = {
  IMCPSummaryFragment: IMCP_SUMMARY_FRAGMENT,
};

export default Summary;
