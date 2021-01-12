import React from 'react';
import { gql } from '@apollo/client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const CANCER_GENE_CENSUS_SUMMARY = gql`
  fragment CancerGeneCensusSummary on Disease {
    cancerGeneCensusSummary: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["cancer_gene_census"]
      size: 0
    ) {
      count
    }
  }
`;

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
