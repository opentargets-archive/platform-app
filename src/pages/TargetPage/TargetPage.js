import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import BasePage from '../../components/BasePage';
import Header from './Header';
import { oldPlatformUrl } from '../../constants';
import Profile from '../TargetPage/Profile';
import { RoutingTab, RoutingTabs } from '../../components/RoutingTabs';

const TARGET_PAGE_QUERY = gql`
  query TargetPageQuery($ensgId: String!) {
    target(ensemblId: $ensgId) {
      id
      approvedSymbol
      approvedName
      proteinAnnotations {
        id
      }
    }
  }
`;

function TargetPage({ match }) {
  const { ensgId } = match.params;
  const { loading, data } = useQuery(TARGET_PAGE_QUERY, {
    variables: { ensgId },
  });

  // TODO: handle errors/loading
  if (data && !data.target) {
    return <Redirect to={{ pathname: '/notFoundPage' }} />;
  }

  const { approvedSymbol, approvedName } = data?.target || {};
  const uniprotId = data?.target.proteinAnnotations?.id;

  return (
    <BasePage title={approvedSymbol}>
      <Header
        loading={loading}
        ensgId={ensgId}
        uniprotId={uniprotId}
        symbol={approvedSymbol}
        name={approvedName}
      />

      <RoutingTabs>
        <RoutingTab
          label="Profile"
          path="/target/:ensgId"
          component={Profile}
        />
        <RoutingTab
          label="View this page in the classic view"
          url={`${oldPlatformUrl}/target/${ensgId}`}
        />
        <RoutingTab
          label="Associations (classic)"
          path="/target/:ensgId/classic-associations"
          component={() => <>Classic associations</>}
        />
        <RoutingTab
          label="View associated diseases"
          url={`${oldPlatformUrl}/target/${ensgId}/associations`}
        />
      </RoutingTabs>
    </BasePage>
  );
}

export default TargetPage;
