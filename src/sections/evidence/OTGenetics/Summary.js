import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { dataTypesMap } from '../../../dataTypes';

const OPEN_TARGETS_GENETICS_SUMMARY_FRAGMENT = loader(
  './OpenTargetsGeneticsSummary.gql'
);

function Summary({ definition }) {
  const request = usePlatformApi(OPEN_TARGETS_GENETICS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.openTargetsGenetics.count} entr${
          data.openTargetsGenetics.count === 1 ? 'y' : 'ies'
        }`
      }
      subText={dataTypesMap.genetic_association}
    />
  );
}

Summary.fragments = {
  OpenTargetsGeneticsSummaryFragment: OPEN_TARGETS_GENETICS_SUMMARY_FRAGMENT,
};

export default Summary;
