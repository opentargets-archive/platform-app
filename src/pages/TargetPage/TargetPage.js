import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Tabs, Tab } from '@material-ui/core';

import BasePage from '../../components/BasePage';
import ClassicAssociations from './ClassicAssociations';
import Header from './Header';
import { oldPlatformUrl } from '../../constants';
import Profile from './Profile';

const TARGET_PAGE_QUERY = gql`
  query TargetQuery($ensgId: String!) {
    target(ensemblId: $ensgId) {
      id
      approvedSymbol
      approvedName
      bioType
      hgncId
      nameSynonyms
      symbolSynonyms
      proteinAnnotations {
        id
        functions
      }
    }
  }
`;

const TargetPage = ({ location, match }) => {
  const { ensgId } = match.params;

  const { loading, data } = useQuery(TARGET_PAGE_QUERY, {
    variables: { ensgId },
  });

  if (loading) return null;
  if (data && !data.target) {
    return <Redirect to={{ pathname: '/notFoundPage' }} />;
  }

  const { approvedSymbol: symbol, approvedName: name } = data.target;
  const uniprotId = data.target.proteinAnnotations?.id;
  const description = data.target.proteinAnnotations?.functions?.[0];
  const synonyms = data.target.symbolSynonyms;

  return (
    <BasePage>
      <Helmet>
        <title>{symbol}</title>
      </Helmet>
      <Header
        ensgId={ensgId}
        uniprotId={uniprotId}
        symbol={symbol}
        name={name}
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
        <Tab
          component="a"
          href={`${oldPlatformUrl}/target/${ensgId}/associations`}
          label="Classic view"
        />
      </Tabs>
      <Switch>
        <Route path={`${match.path}/associations`}>
          <ClassicAssociations
            ensgId={ensgId}
            uniprotId={uniprotId}
            symbol={symbol}
            name={name}
          />
        </Route>
        <Route path={match.path}>
          <Profile
            ensgId={ensgId}
            uniprotId={uniprotId}
            symbol={symbol}
            name={name}
            synonyms={synonyms}
            description={description}
          />
        </Route>
      </Switch>
    </BasePage>
  );
};

export default TargetPage;
