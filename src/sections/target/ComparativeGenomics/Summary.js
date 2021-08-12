import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const COMP_GENOMICS_SUMMARY_FRAGMENT = loader(
  './CompGenomicsSummaryFragment.gql'
);

function Summary({ definition, id: ensgId }) {
  const request = usePlatformApi(COMP_GENOMICS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ homologues }) => {
        let orthologueCount = 0;

        homologues.forEach(({ homologyType }) => {
          if (
            homologyType === 'ortholog_one2one' ||
            homologyType === 'ortholog_one2many' ||
            homologyType === 'ortholog_many2many'
          ) {
            orthologueCount++;
          }
        });

        return `${orthologueCount} orthologues`;
      }}
    />
  );
}

Summary.fragments = {
  CompGenomicsSummaryFragment: COMP_GENOMICS_SUMMARY_FRAGMENT,
};

export default Summary;
