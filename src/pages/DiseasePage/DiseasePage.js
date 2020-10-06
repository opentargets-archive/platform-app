import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import BasePage from '../../components/BasePage';
import Header from './Header';
import { oldPlatformUrl } from '../../constants';
import Profile from './Profile';
import { RoutingTab, RoutingTabs } from '../../components/RoutingTabs';

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

function DiseasePage({ history, location, match }) {
  const { efoId } = match.params;
  const { loading, error, data } = useQuery(DISEASE_PAGE_QUERY, {
    variables: { efoId },
  });

  // TODO: handle errors/loading
  if (data && !data.disease) {
    return (
      <Redirect to={{ pathname: '/search', search: `?q=${efoId}&page=1` }} />
    );
  }

  const { name, description, synonyms } = data?.disease || {};

  return (
    <BasePage>
      <Helmet>
        <title>{data?.disease.name}</title>
      </Helmet>
      <Header efoId={efoId} name={data?.disease.name} />

      <RoutingTabs>
        <RoutingTab
          label="Profile"
          path="/disease/:efoId"
          component={() => (
            <Profile {...{ efoId, name, description, synonyms }} />
          )}
        />
        <RoutingTab
          label="View this page in the classic view"
          url={`${oldPlatformUrl}/disease/${efoId}`}
        />
        <RoutingTab
          label="Associations (classic)"
          path="/disease/:efoId/classic-associations"
          component={() => <Associations efoId={efoId} name={name} />}
        />
        <RoutingTab
          label="View associated targets"
          url={`${oldPlatformUrl}/disease/${efoId}/associations`}
        />
      </RoutingTabs>
    </BasePage>
  );
}

export default DiseasePage;
