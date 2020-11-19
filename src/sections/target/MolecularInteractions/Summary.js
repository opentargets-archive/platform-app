import React from 'react';
import { gql } from '@apollo/client';
import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const MOLECULAR_INTERACTIONS_SUMMARY_FRAGMENT = gql`
  fragment TargetMolecularInteractionsSummaryFragment on Target {
    interactions {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(MOLECULAR_INTERACTIONS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => `${data.interactions.count} interactors`}
    />
  );
}

Summary.fragments = {
  TargetMolecularInteractionsSummaryFragment: MOLECULAR_INTERACTIONS_SUMMARY_FRAGMENT,
};

export default Summary;
