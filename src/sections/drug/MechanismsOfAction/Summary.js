import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const MECHANISM_OF_ACTION_SUMMARY_FRAGMENT = loader(
  './MechanismsOfActionSummaryFragment.gql'
);

function Summary({ definition }) {
  const request = usePlatformApi(MECHANISM_OF_ACTION_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => (
        <>
          {data.mechanismsOfAction.uniqueActionTypes.length > 0
            ? data.mechanismsOfAction.uniqueActionTypes.join(' • ')
            : null}
          <br />
          {data.mechanismsOfAction.uniqueTargetTypes.length > 0
            ? data.mechanismsOfAction.uniqueTargetTypes.join(' • ')
            : null}
        </>
      )}
    />
  );
}

Summary.fragments = {
  MechanismsOfActionSummaryFragment: MECHANISM_OF_ACTION_SUMMARY_FRAGMENT,
};

export default Summary;
