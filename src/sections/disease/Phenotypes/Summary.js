import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const PHENOTYPES_SUMMARY_FRAGMENT = gql`
  fragment PhenotypesSummaryFragment on Disease {
    phenotypes(page: { index: 0, size: 0 }) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(PHENOTYPES_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => {
        console.log('phenotypes: ', data);
        return <>{data.phenotypes.count} phenotypes</>;
      }}
    />
  );
}

Summary.fragments = { PhenotypesSummaryFragment: PHENOTYPES_SUMMARY_FRAGMENT };

export default Summary;
