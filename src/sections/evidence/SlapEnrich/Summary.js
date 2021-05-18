import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const SLAPENRICH_SUMMARY_FRAGMENT = loader('./SlapEnrichSummaryFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(SLAPENRICH_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data =>
        `${data.slapEnrich.count} entr${
          data.slapEnrich.count === 1 ? 'y' : 'ies'
        }`
      }
    />
  );
}

Summary.fragments = {
  SlapEnrichSummaryFragment: SLAPENRICH_SUMMARY_FRAGMENT,
};

export default Summary;
