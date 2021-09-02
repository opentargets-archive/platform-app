import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SIMILARENTTIES_SUMMARY_FRAGMENT = loader('./SimilarEntitiesSummary.gql');

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
