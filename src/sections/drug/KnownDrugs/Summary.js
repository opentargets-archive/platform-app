import React from 'react';
import { loader } from 'graphql.macro';
import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const KNOWN_DRUGS_SUMMARY_FRAGMENT = loader('./KnownDrugsSummaryFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(KNOWN_DRUGS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => (
        <>
          {(data.knownDrugs.uniqueTargets || 0).toLocaleString()} target
          {data.knownDrugs.uniqueTargets === 1 ? '' : 's'} and{' '}
          {(data.knownDrugs.uniqueDiseases || 0).toLocaleString()} indication
          {data.knownDrugs.uniqueDiseases === 1 ? '' : 's'}
        </>
      )}
    />
  );
}

Summary.fragments = {
  DrugKnownDrugsSummaryFragment: KNOWN_DRUGS_SUMMARY_FRAGMENT,
};

export default Summary;
