import React from 'react';
import { gql } from '@apollo/client';

import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const DRUG_WARNINGS_SUMMARY_FRAGMENT = gql`
  fragment DrugWarningsSummaryFragment on Drug {
    drugWarnings {
      warningType
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(DRUG_WARNINGS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ drugWarnings }) => {
        const withdrawn = drugWarnings.some(
          ({ warningType }) => warningType === 'Withdrawn'
        );
        const blackBox = drugWarnings.some(
          ({ warningType }) => warningType === 'Black Box Warning'
        );

        if (withdrawn && blackBox) {
          return 'Withdrawn • Black Box';
        }

        if (withdrawn) return 'Withdrawn';

        if (blackBox) return 'Black Box';
      }}
    />
  );
}

Summary.fragments = {
  DrugWarningsSummaryFragment: DRUG_WARNINGS_SUMMARY_FRAGMENT,
};

export default Summary;
