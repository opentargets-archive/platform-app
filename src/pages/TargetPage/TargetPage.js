import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import BasePage from '../../components/BasePage';
import Header from './Header';
import { oldPlatformUrl } from '../../constants';
import Profile from '../TargetPage/Profile';
import { RoutingTab, RoutingTabs } from '../../components/RoutingTabs';
import ClassicAssociations from '../TargetPage/ClassicAssociations';

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
          label="Associated diseases"
          path="/target/:ensgId/associations"
          component={() => (
            <ClassicAssociations ensgId={ensgId} symbol={approvedSymbol} />
          )}
        />
        <RoutingTab
          label="Profile"
          path="/target/:ensgId"
          component={() => (
            <Profile ensgId={ensgId} approvedSymbol={approvedSymbol} />
          )}
        />
        <RoutingTab
          label="Classic view"
          url={`${oldPlatformUrl}/target/${ensgId}`}
        />
      </RoutingTabs>
    </BasePage>
  );
}

export default TargetPage;
