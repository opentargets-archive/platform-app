import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const LOCATIONS_SUMMARY_FRAGMENT = gql`
  fragment LocationsSummaryFragment on Disease {
    indirectLocations {
      id
      name
    }
    directLocations {
      id
      name
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(LOCATIONS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => (
        <>
          {(data.indirectLocations?.length || 0) +
            (data.directLocations?.length || 0)}{' '}
          locations
        </>
      )}
    />
  );
}

Summary.fragments = { LocationsSummaryFragment: LOCATIONS_SUMMARY_FRAGMENT };

export default Summary;
