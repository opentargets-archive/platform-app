import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const TRACTABILITY_SUMMARY_FRAGMENT = loader('./TractabilitySummary.gql');

function Summary({ definition }) {
  const request = usePlatformApi(TRACTABILITY_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => {
        const sources = [];

        if (data.tractability.antibody?.buckets?.length > 0) {
          sources.push('antibody');
        }
        if (data.tractability.smallmolecule?.buckets?.length > 0) {
          sources.push('small molecule');
        }
        if (data.tractability.otherModalities?.buckets?.length > 0) {
          sources.push('other modalities');
        }

        return sources.length > 0 ? sources.join(' • ') : null;
      }}
    />
  );
}

Summary.fragments = {
  TractabilitySummaryFragment: TRACTABILITY_SUMMARY_FRAGMENT,
};

export default Summary;
