import React from 'react';
import { loader } from 'graphql.macro';
import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { dataTypesMap } from '../../../dataTypes';

const GENE_2_PHENOTYPE_SUMMARY_FRAGMENT = loader(
  './Gene2PhenotypeSummaryFragment.gql'
);

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
      subText={dataTypesMap.genetic_association}
    />
  );
}

Summary.fragments = {
  Gene2PhenotypeSummaryFragment: GENE_2_PHENOTYPE_SUMMARY_FRAGMENT,
};

export default Summary;
