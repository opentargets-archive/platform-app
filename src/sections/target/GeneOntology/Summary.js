import React from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const GENE_ONTOLOGY_SUMMARY_FRAGMENT = gql`
  fragment GeneOntologySummaryFragment on Target {
    proteinAnnotations {
      id
    }
    geneOntology {
      term
      id
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(GENE_ONTOLOGY_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => {
        const prefixCounts = _.countBy(data.geneOntology, row =>
          row.term.substring(0, 1)
        );
        return (
          <>
            {data.geneOntology.length} terms in total
            <br />
            {prefixCounts['F']} MF • {prefixCounts['P']} BP •{' '}
            {prefixCounts['C']} CC
          </>
        );
      }}
    />
  );
}

Summary.fragments = {
  GeneOntologySummaryFragment: GENE_ONTOLOGY_SUMMARY_FRAGMENT,
};

export default Summary;
