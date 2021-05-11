import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SIMILARENTTIES_SUMMARY_FRAGMENT = gql`
  fragment EntitiesSummaryFragment on Target {
    literatureOcurrences {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(SIMILARENTTIES_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        data.literatureOcurrences?.count > 0 ? (
          <>
            {data.literatureOcurrences.count.toLocaleString()} publication
            {data.literatureOcurrences.count === 1 ? '' : 's'}
          </>
        ) : (
          <>no data</>
        )
      }
    />
  );
}

Summary.fragments = {
  EntitiesSummaryFragment: SIMILARENTTIES_SUMMARY_FRAGMENT,
};

export default Summary;
