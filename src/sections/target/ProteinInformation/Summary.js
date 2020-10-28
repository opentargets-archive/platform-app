import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const PROTEIN_INFORMATION_SUMMARY_FRAGMENT = gql`
  fragment ProteinInformationSummaryFragment on Target {
    proteinAnnotations {
      id
      subcellularLocations
      subunits
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(PROTEIN_INFORMATION_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={() => 'Positional, Structural and Functional Information'}
    />
  );
}

Summary.fragments = {
  ProteinInformationSummaryFragment: PROTEIN_INFORMATION_SUMMARY_FRAGMENT,
};

export default Summary;
