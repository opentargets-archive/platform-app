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
        const hallmarks = _.uniqBy(data.hallmarks.rows, 'label');
        const promote = _.uniqBy(
          data.hallmarks.rows.filter(d => d.promote),
          'label'
        );
        const suppress = _.uniqBy(
          data.hallmarks.rows.filter(d => d.suppress),
          'label'
        );

        return (
          <>
            {hallmarks.length} hallmarks
            <br />
            {promote.length} promote • {suppress.length} suppress
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
