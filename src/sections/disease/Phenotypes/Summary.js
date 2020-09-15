import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SUMMARY_FRAGMENT = gql`
  fragment PhenotypesSummaryFragment on Disease {
    name
    phenotypes {
      disease
      name
      url
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => <>{data.phenotypes.length} phenotypes</>}
    />
  );
}

Summary.fragments = { PhenotypesSummaryFragment: SUMMARY_FRAGMENT };

export default Summary;
