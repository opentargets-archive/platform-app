import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Tabs, Tab } from 'ot-ui';

import Associations from './Associations';
import BasePage from '../../components/BasePage';
import ClassicAssociations from './ClassicAssociations';
import Header from './Header';
import Profile from './Profile';

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
    if (value.indexOf('http' === 0)) {
      // navigte to external page: first store current page
      // for back button to work correctly
      // TODO: this link will be removed after alpha/beta
      history.push(match.url);
      window.location.replace(value);
    } else {
      const path = value === 'overview' ? match.url : `${match.url}/${value}`;
      history.push(path);
    }
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
        {/* <Tab value="classic-associations" label="Associations (classic)" />
        <Tab value="associations" label="Associations (dynamic)" /> */}
        <Tab value="overview" label="Profile" />
        <Tab
          value={`https://www.targetvalidation.org/disease/${efoId}`}
          label="View this page in the classic view"
        />
        <Tab
          value={`https://www.targetvalidation.org/disease/${efoId}/associations`}
          label="View associated targets"
        />
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
