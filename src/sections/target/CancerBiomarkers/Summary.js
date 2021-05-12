import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const CANCER_BIOMARKERS_SUMMARY_FRAGMENT = loader(
  './CancerBiomarkersSummary.gql'
);

function Summary({ definition }) {
  const request = usePlatformApi(CANCER_BIOMARKERS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => (
        <>
          {data.cancerBiomarkers.uniqueBiomarkers} biomarkers
          <br />
          (affecting {data.cancerBiomarkers.uniqueDrugs} drug
          {data.cancerBiomarkers.uniqueDrugs === 1 ? "'s" : "s'"}{' '}
          responsiveness)
        </>
      )}
    />
  );
}

Summary.fragments = {
  CancerBiomarkersSummaryFragment: CANCER_BIOMARKERS_SUMMARY_FRAGMENT,
};

export default Summary;
