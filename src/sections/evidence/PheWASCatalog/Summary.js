import React from 'react';
import { gql } from '@apollo/client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const PHEWAS_CATALOG_SUMMARY = gql`
  fragment PheWASCatalogSummary on Disease {
    phewasCatalogSummary: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["phewas_catalog"]
      size: 0
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(PHEWAS_CATALOG_SUMMARY);
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ phewasCatalogSummary }) => {
        const { count } = phewasCatalogSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
    />
  );
}

Summary.fragments = {
  PheWASCatalogSummary: PHEWAS_CATALOG_SUMMARY,
};

export default Summary;
