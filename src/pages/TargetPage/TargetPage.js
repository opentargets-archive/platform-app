import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Switch, Route, Link } from 'react-router-dom';
import { Tab, Tabs } from '@material-ui/core';

import BasePage from '../../components/BasePage';
import ScrollToTop from '../../components/ScrollToTop';
import Header from './Header';
import NotFoundPage from '../NotFoundPage';
import Profile from '../TargetPage/Profile';
import ClassicAssociations from '../TargetPage/ClassicAssociations';

const TARGET_PAGE_QUERY = gql`
  query TargetPageQuery($ensgId: String!) {
    target(ensemblId: $ensgId) {
      id
      approvedSymbol
      approvedName
      rmtl_fda_designation
      proteinAnnotations {
        id
      }
    }
  }
`;

function TargetPage({ location, match }) {
  const { ensgId } = match.params;
  const { loading, data } = useQuery(TARGET_PAGE_QUERY, {
    variables: { ensgId },
  });

  if (data && !data.target) {
    return <NotFoundPage />;
  }

  const { approvedSymbol: symbol, approvedName, rmtl_fda_designation: rmtl } =
    data?.target || {};
  const uniprotId = data?.target.proteinAnnotations?.id;

  return (
    <BasePage title={symbol}>
      <ScrollToTop />
      <Header
        loading={loading}
        ensgId={ensgId}
        uniprotId={uniprotId}
        symbol={symbol}
        name={approvedName}
        rmtl={rmtl}
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
