import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const OT_PROJECTS_SUMMARY_FRAGMENT = loader('./OTProjectsSummaryFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(OT_PROJECTS_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ otarProjects }) => {
        return (
          <>
            {otarProjects.length} OTAR project
            {otarProjects.length === 1 ? '' : 's'}
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
