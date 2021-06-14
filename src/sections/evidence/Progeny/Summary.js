import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { dataTypesMap } from '../../../dataTypes';

const PROGENY_SUMMARY_FRAGMENT = loader('./ProgenySummaryFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(PROGENY_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.progeny.count} entr${data.progeny.count === 1 ? 'y' : 'ies'}`
      }
      subText={dataTypesMap.affected_pathway}
    />
  );
}

Summary.fragments = {
  ProgenySummaryFragment: PROGENY_SUMMARY_FRAGMENT,
};

export default Summary;
