import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SUMMARY_FRAGMENT = gql`
  fragment RelatedDiseasesFragment on Disease {
    relatedDiseases {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(SUMMARY_FRAGMENT);

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
  RelatedDiseasesFragment: SUMMARY_FRAGMENT,
};

export default Summary;
