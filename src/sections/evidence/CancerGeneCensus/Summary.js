import React from 'react';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';
import { loader } from 'graphql.macro';

const CANCER_GENE_CENSUS_SUMMARY = loader('./CancerGeneCensusSummaryQuery.gql');

function Summary({ definition }) {
  const request = usePlatformApi(CANCER_GENE_CENSUS_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ cancerGeneCensusSummary }) => {
        const { count } = cancerGeneCensusSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
    />
  );
}

Summary.fragments = {
  CancerGeneCensusSummary: CANCER_GENE_CENSUS_SUMMARY,
};

export default Summary;
