import React from 'react';
import { useQuery } from '@apollo/client';
import { Route, Switch } from 'react-router-dom';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import { Tabs, Tab } from 'ot-ui';

import Associations from './Associations';
import ClassicAssociations from './ClassicAssociations';
import Header from './Header';
import Profile from './Profile';
import BasePage from '../common/BasePage';

const DISEASE_QUERY = gql`
  query DiseaseQuery($efoId: String!) {
    disease(efoId: $efoId) {
      id
      name
      description
      synonyms
    }
  }
`;

const DiseasePage = ({ history, location, match }) => {
  const handleChange = (event, value) => {
    const path = value === 'overview' ? match.url : `${match.url}/${value}`;
    history.push(path);
  };

  const tab = location.pathname.endsWith('associations')
    ? location.pathname.split('/').pop()
    : 'overview';
  const { efoId } = match.params;

  const { loading, error, data } = useQuery(DISEASE_QUERY, {
    variables: { efoId },
  });

  if (loading || error) return null;

  const { name, description, synonyms } = data.disease;

  return (
    <BasePage>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <Header {...{ efoId, name, description, synonyms }} />
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
          render={() => <ClassicAssociations efoId={efoId} name={name} />}
        />
        <Route
          path={`${match.path}/associations`}
          render={() => <Associations efoId={efoId} name={name} />}
        />
        <Route
          path={match.path}
          render={() => <Profile {...{ efoId, name, description, synonyms }} />}
        />
      </Switch>
    </BasePage>
  );
};

export default DiseasePage;
