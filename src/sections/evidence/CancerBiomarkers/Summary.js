import React from 'react';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';
import { dataTypesMap } from '../../../dataTypes';

const CANCER_BIOMARKERS_EVIDENCE_FRAGMENT = loader(
  './CancerBiomarkersEvidenceFragment.gql'
);

function Summary({ definition }) {
  const request = usePlatformApi(CANCER_BIOMARKERS_EVIDENCE_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ cancerBiomarkersSummary }) => {
        const { count } = cancerBiomarkersSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
      subText={dataTypesMap.affected_pathway}
    />
  );
}

Summary.fragments = {
  CancerBiomarkersEvidenceFragment: CANCER_BIOMARKERS_EVIDENCE_FRAGMENT,
};

export default Summary;
