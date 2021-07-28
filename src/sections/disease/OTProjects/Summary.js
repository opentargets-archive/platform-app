import React from 'react';
import { loader } from 'graphql.macro';

import projects from './projects.json';
import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const OT_PROJECTS_SUMMARY_FRAGMENT = loader('./OTProjectsSummaryFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(OT_PROJECTS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={() => {
        let numActive = 0;
        let numClosed = 0;

        projects.forEach(({ status }) => {
          if (status === 'Active') {
            numActive++;
          } else {
            numClosed++;
          }
        });

        return (
          <>
            {numActive} active project{numActive === 1 ? '' : 's'}
            <br />
            {numClosed} closed project{numClosed === 1 ? '' : 's'}
          </>
        );
      }}
    />
  );
}

Summary.fragments = {
  OTProjectsSummaryFragment: OT_PROJECTS_SUMMARY_FRAGMENT,
};

export default Summary;
