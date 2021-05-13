import React from 'react';
import { loader } from 'graphql.macro';
import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const MOLECULAR_INTERACTIONS_SUMMARY_FRAGMENT = loader(
  './InteractionsSummary.gql'
);

function Summary({ definition }) {
  const request = usePlatformApi(MOLECULAR_INTERACTIONS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.interactions.count} physical or functional interactors`
      }
    />
  );
}

Summary.fragments = {
  TargetMolecularInteractionsSummaryFragment: MOLECULAR_INTERACTIONS_SUMMARY_FRAGMENT,
};

export default Summary;
