import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const GENE_2_PHENOTYPE_SUMMARY_FRAGMENT = gql`
  fragment Gene2PhenotypeSummaryFragment on Disease {
    gene2Phenotype: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["gene2phenotype"]
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(GENE_2_PHENOTYPE_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.gene2Phenotype.count} entr${
          data.gene2Phenotype.count === 1 ? 'y' : 'ies'
        }`
      }
    />
  );
}

Summary.fragments = {
  Gene2PhenotypeSummaryFragment: GENE_2_PHENOTYPE_SUMMARY_FRAGMENT,
};

export default Summary;
