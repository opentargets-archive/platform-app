import React from 'react';
import _ from 'lodash';
import { gql } from '@apollo/client';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const TRACTABILITY_SUMMARY_FRAGMENT = gql`
  fragment TractabilitySummaryFragment on Target {
    tractability {
      smallmolecule {
        buckets
      }
      antibody {
        buckets
      }
      otherModalities {
        buckets
      }
    }
  }
`;

function Summary({ definition }) {
  const request = usePlatformApi(TRACTABILITY_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => {
        const sources = [];

        if (_.get(data.tractability, 'antibody.buckets.length', 0) > 0) {
          sources.push('antibody');
        }
        if (_.get(data.tractability, 'smallmolecule.buckets.length', 0) > 0) {
          sources.push('small molecule');
        }
        if (_.get(data.tractability, 'otherModalities.buckets.length', 0) > 0) {
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
