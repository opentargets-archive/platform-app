import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SIMILARENTTIES_SUMMARY_FRAGMENT_T = gql`
  fragment EntitiesSummaryFragmentT on Target {
    similarW2VEntities(threshold: 0, size: 1) {
      score
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(SIMILARENTTIES_SUMMARY_FRAGMENT_T);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        data.similarW2VEntities?.length > 0 ? <>Data available</> : <>no data</>
      }
    />
  );
}

Summary.fragments = {
  EntitiesSummaryFragmentT: SIMILARENTTIES_SUMMARY_FRAGMENT_T,
};

export default Summary;
