import React from 'react';
import { gql } from '@apollo/client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const CHEMBL_SUMMARY_FRAGMENT = gql`
  fragment ChemblSummaryFragment on Disease {
    chemblSummary: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["chembl"]
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(CHEMBL_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ chemblSummary }) => {
        const { count } = chemblSummary;
        return `${count} record${count > 1 ? 's' : ''}`;
      }}
    />
  );
}

Summary.fragments = {
  ChemblSummaryFragment: CHEMBL_SUMMARY_FRAGMENT,
};

export default Summary;
