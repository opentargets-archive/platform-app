import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';
import { Tabs, Tab } from 'ot-ui';

import Header from './Header';
import ClassicAssociations from './ClassicAssociations';
import Associations from './Associations';
import Profile from './Profile';
import BasePage from '../common/BasePage';

const TARGET_QUERY = gql`
  query TargetQuery($ensgId: String!) {
    target(ensemblId: $ensgId) {
      # description
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

const TargetPage = ({ history, location, match }) => {
  const handleChange = (event, value) => {
    const path = value === 'overview' ? match.url : `${match.url}/${value}`;
    history.push(path);
  };

  const tab = location.pathname.endsWith('associations')
    ? location.pathname.split('/').pop()
    : 'overview';
  const { ensgId } = match.params;

  const { loading, error, data } = useQuery(TARGET_QUERY, {
    variables: { ensgId },
  });

  if (loading || error) return null;

  const {
    approvedSymbol,
    approvedName,
    proteinAnnotations,
    symbolSynonyms,
  } = data.target;
  const uniprotId = proteinAnnotations.id;
  const description = proteinAnnotations.functions
    ? proteinAnnotations.functions[0]
    : null;

  return (
    <BasePage>
      <Helmet>
        <title>{approvedSymbol}</title>
      </Helmet>
      <Header
        ensgId={ensgId}
        uniprotId={uniprotId}
        symbol={approvedSymbol}
        name={approvedName}
      />
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab value="classic-associations" label="Associations (classic)" />
        <Tab value="associations" label="Associations (dynamic)" />
        <Tab value="overview" label="Profile" />
      </Tabs>
      <Switch>
        <Route
          path={`${match.path}/classic-associations`}
          render={() => (
            <ClassicAssociations
              ensgId={ensgId}
              uniprotId={uniprotId}
              symbol={approvedSymbol}
              name={approvedName}
            />
          )}
        />
        <Route
          path={`${match.path}/associations`}
          render={() => (
            <Associations
              ensgId={ensgId}
              uniprotId={uniprotId}
              symbol={approvedSymbol}
              name={approvedName}
            />
          )}
        />
        <Route
          path={match.path}
          render={() => (
            <Profile
              ensgId={ensgId}
              uniprotId={uniprotId}
              symbol={approvedSymbol}
              name={approvedName}
              synonyms={symbolSynonyms}
              description={description}
            />
          )}
        />
      </Switch>
    </BasePage>
  );
};

export default TargetPage;
