import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import BasePage from '../../components/BasePage';
import ClassicAssociations from './ClassicAssociations';
import Header from './Header';
import { oldPlatformUrl } from '../../constants';
import Profile from './Profile';
import { RoutingTab, RoutingTabs } from '../../components/RoutingTabs';

const DISEASE_PAGE_QUERY = gql`
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
  const { loading, data } = useQuery(DISEASE_PAGE_QUERY, {
    variables: { efoId },
  });

  if (loading) return null;
  if (data && !data.disease) {
    return (
      <Redirect to={{ pathname: '/search', search: `?q=${efoId}&page=1` }} />
    );
  }

  const { name, description, synonyms } = data.disease;

  return (
    <BasePage>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <Header efoId={efoId} name={name} />

      <RoutingTabs>
        <RoutingTab
          label="Associated targets"
          path="/disease/:efoId"
          component={() => <ClassicAssociations efoId={efoId} name={name} />}
        />
        <RoutingTab
          label="Profile"
          path="/disease/:efoId/profile"
          component={() => (
            <Profile
              efoId={efoId}
              name={name}
              description={description}
              synonyms={synonyms}
            />
          )}
        />
        <RoutingTab
          label="Classic view"
          url={`${oldPlatformUrl}/disease/${efoId}/associations`}
        />
      </RoutingTabs>
    </BasePage>
  );
}

export default DiseasePage;
