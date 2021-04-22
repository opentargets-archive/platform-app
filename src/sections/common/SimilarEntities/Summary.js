import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SIMILARENTTIES_SUMMARY_FRAGMENT = gql`
  fragment SimilarEntitiesDisease on Disease {
    similarEntities(threshold: 0.5, size: 20) {
      score
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
        data.similarEntities?.length > 0 ? <>Data available</> : <>no data</>
      }
    />
  );
}

Summary.fragments = {
  SimilarEntitiesDisease: SIMILARENTTIES_SUMMARY_FRAGMENT,
};

export default Summary;
