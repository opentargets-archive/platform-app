import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const RELATED_DISEASES_SUMMARY_FRAGMENT = gql`
  fragment RelatedDiseasesSummaryFragment on Disease {
    relatedDiseases {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(RELATED_DISEASES_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => (
        <>
          {data.relatedDiseases.count} diseases
          <br />
          (through shared targets)
        </>
      )}
    />
  );
}

Summary.fragments = {
  RelatedDiseasesSummaryFragment: RELATED_DISEASES_SUMMARY_FRAGMENT,
};

export default Summary;
