import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SUBCELLULAR_LOCATION_FRAGMENT = loader(
  './SubcellularLocationFragment.gql'
);

function Summary({ definition }) {
  const request = usePlatformApi(SUBCELLULAR_LOCATION_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ subcellularLocations }) =>
        `${subcellularLocations.length} subcelullar locations`
      }
    />
  );
}

Summary.fragments = {
  SubcellularLocationFragment: SUBCELLULAR_LOCATION_FRAGMENT,
};

export default Summary;
