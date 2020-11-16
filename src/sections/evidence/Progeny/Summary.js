import React from 'react';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const PROGENY_SUMMARY_FRAGMENT = gql`
  fragment ProgenySummaryFragment on Disease {
    progeny: evidences(
      ensemblIds: [$ensgId]
      enableIndirect: true
      datasourceIds: ["progeny"]
      size: 0
    ) {
      count
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(PROGENY_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.progeny.count} entr${data.progeny.count === 1 ? 'y' : 'ies'}`
      }
    />
  );
}

Summary.fragments = {
  ProgenySummaryFragment: PROGENY_SUMMARY_FRAGMENT,
};

export default Summary;
