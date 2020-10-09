import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import BasePage from '../../components/BasePage';
import Header from './Header';
import { oldPlatformUrl } from '../../constants';
import Profile from './Profile';
import { RoutingTab, RoutingTabs } from '../../components/RoutingTabs';

const EVIDENCE_PAGE_QUERY = gql`
  query EvidencePageQuery($ensgId: String!, $efoId: String!) {
    target(ensemblId: $ensgId) {
      id
      approvedSymbol
    }
    disease(efoId: $efoId) {
      id
      name
    }
  }
`;

function EvidencePage({ match }) {
  const { ensgId, efoId } = match.params;
  const { loading, data } = useQuery(EVIDENCE_PAGE_QUERY, {
    variables: { ensgId, efoId },
  });

  // TODO: handle errors/loading
  if (data && !(data.target && data.disease)) {
    return <Redirect to={{ pathname: '/notFoundPage' }} />;
  }

  const { approvedSymbol } = data?.target || {};
  const { name } = data?.disease || {};

  return (
    <BasePage title={`Evidence for ${approvedSymbol} in ${name}`}>
      <Header
        loading={loading}
        efoId={efoId}
        ensgId={ensgId}
        approvedSymbol={approvedSymbol}
        name={name}
      />

      <RoutingTabs>
        <RoutingTab
          label="Profile"
          path="/evidence/:ensgId/:efoId"
          component={Profile}
        />
        <RoutingTab
          label="View this page in the classic view"
          url={`${oldPlatformUrl}/evidence/${ensgId}/${efoId}`}
        />
      </RoutingTabs>
    </BasePage>
  );
}

export default EvidencePage;
