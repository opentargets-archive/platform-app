import React from 'react';
import { loader } from 'graphql.macro';

import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const DRUG_WARNINGS_SUMMARY_FRAGMENT = loader(
  './DrugWarningsSummaryFragment.gql'
);

function Summary({ definition }) {
  const request = usePlatformApi(DRUG_WARNINGS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ hasBeenWithdrawn, blackBoxWarning }) => {
        if (hasBeenWithdrawn && blackBoxWarning) {
          return 'Withdrawn • Black Box';
        }

        if (hasBeenWithdrawn) return 'Withdrawn';

        if (blackBoxWarning) return 'Black Box';
      }}
    />
  );
}

Summary.fragments = {
  DrugWarningsSummaryFragment: DRUG_WARNINGS_SUMMARY_FRAGMENT,
};

export default Summary;
