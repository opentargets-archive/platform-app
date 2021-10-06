import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { Switch, Route, Link } from 'react-router-dom';
import { Tab, Tabs } from '@material-ui/core';

import BasePage from '../../components/BasePage';
import ScrollToTop from '../../components/ScrollToTop';
import Header from './Header';
import NotFoundPage from '../NotFoundPage';
import Profile from '../TargetPage/Profile';
import ClassicAssociations from '../TargetPage/ClassicAssociations';
import { getUniprotIds } from '../../utils/global';

const TARGET_PAGE_QUERY = loader('./TargetPage.gql');

function TargetPage({ location, match }) {
  const { ensgId } = match.params;
  const { loading, data } = useQuery(TARGET_PAGE_QUERY, {
    variables: { ensgId },
  });

  if (data && !data.target) {
    return <NotFoundPage />;
  }

  const { approvedSymbol: symbol, approvedName } = data?.target || {};
  const uniprotIds = loading ? null : getUniprotIds(data.target.proteinIds);
  const crisprId = data?.target.dbXrefs.find(p => p.source === 'ProjectScore')
    ?.id;

  return (
    <BasePage
      title={
        location.pathname.includes('associations')
          ? `Diseases associated with ${symbol}`
          : `${symbol} profile page`
      }
      description={
        location.pathname.includes('associations')
          ? `Ranked list of diseases and phenotypes associated with ${symbol}`
          : `Annotation information for ${symbol}`
      }
      location={location}
    >
      <ScrollToTop />
      <Header
        loading={loading}
        ensgId={ensgId}
        uniprotIds={uniprotIds}
        symbol={symbol}
        name={approvedName}
        crisprId={crisprId}
      />

      <Tabs
        value={
          location.pathname.includes('associations')
            ? `${match.url}/associations`
            : location.pathname
        }
      >
        <Tab
          value={`${match.url}/associations`}
          component={Link}
          to={`${match.url}/associations`}
          label="Associated diseases"
        />
        <Tab
          value={match.url}
          component={Link}
          label="Profile"
          to={match.url}
        />
      </Tabs>
      <Switch>
        <Route path={`${match.path}/associations`}>
          <ClassicAssociations ensgId={ensgId} symbol={symbol} />
        </Route>
        <Route path={match.path}>
          <Profile ensgId={ensgId} symbol={symbol} />
        </Route>
      </Switch>
    </BasePage>
  );
}

export default TargetPage;
