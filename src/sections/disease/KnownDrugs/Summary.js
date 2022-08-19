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
          {(data.knownDrugs.uniqueDrugs || 0).toLocaleString()} drugs with{' '}
          {(data.knownDrugs.uniqueTargets || 0).toLocaleString()} targets
        </>
      )}
    />
  );
}

Summary.fragments = {
  DiseaseKnownDrugsSummaryFragment: KNOWN_DRUGS_SUMMARY_FRAGMENT,
};

export default Summary;
