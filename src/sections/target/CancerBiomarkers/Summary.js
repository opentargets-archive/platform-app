import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const CANCER_BIOMARKERS_SUMMARY_FRAGMENT = gql`
  fragment CancerBiomarkersSummaryFragment on Target {
    cancerBiomarkers {
      uniqueDrugs
      uniqueDiseases
      uniqueBiomarkers
    }
  }
`;

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
