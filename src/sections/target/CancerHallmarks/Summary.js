import React from 'react';
import { loader } from 'graphql.macro';
import _ from 'lodash';

import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const CANCER_HALLMARKS_SUMMARY_FRAGMENT = loader(
  './HallmarksSummaryFragment.gql'
);

function Summary({ definition }) {
  const request = usePlatformApi(CANCER_HALLMARKS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => {
        const hallmarks = _.uniqBy(data.hallmarks.cancerHallmarks, 'label');
        const promote = _.uniqBy(
          data.hallmarks.cancerHallmarks.filter(d => d.impact === 'promotes'),
          'label'
        );
        const suppress = _.uniqBy(
          data.hallmarks.cancerHallmarks.filter(d => d.impact === 'suppresses'),
          'label'
        );

        return (
          <>
            {hallmarks.length} hallmarks
            <br />
            {promote.length} promoted • {suppress.length} suppressed
          </>
        );
      }}
    />
  );
}

Summary.fragments = {
  CancerHallmarksSummaryFragment: CANCER_HALLMARKS_SUMMARY_FRAGMENT,
};

export default Summary;
