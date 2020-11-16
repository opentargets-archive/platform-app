import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const PATHWAYS_SUMMARY_FRAGMENT = gql`
  fragment PathwaysSummaryFragment on Target {
    proteinAnnotations {
      id
    }
    reactome {
      id
      label
      ancestors {
        isRoot
        id
        label
      }
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(PATHWAYS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => `${data.reactome.length} Reactome pathways`}
    />
  );
}

Summary.fragments = {
  PathwaysSummaryFragment: PATHWAYS_SUMMARY_FRAGMENT,
};

export default Summary;
