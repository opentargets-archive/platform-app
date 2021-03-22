import React from 'react';
import { gql, useQuery } from '@apollo/client';

import BasePage from '../../components/BasePage';
import ClassicAssociations from './ClassicAssociations';
import Header from './Header';
import NotFoundPage from '../NotFoundPage';
import Profile from './Profile';
import { RoutingTab, RoutingTabs } from '../../components/RoutingTabs';

const DISEASE_PAGE_QUERY = gql`
  query DiseasePageQuery($efoId: String!) {
    disease(efoId: $efoId) {
      id
      name
    }
  }
`;

function DiseasePage({ match }) {
  const { efoId } = match.params;
  const { loading, data } = useQuery(DISEASE_PAGE_QUERY, {
    variables: { efoId },
  });

  if (data && !data.disease) {
    return <NotFoundPage />;
  }

  const { name } = data?.disease || {};

  return (
    <BasePage title={name}>
      <Header loading={loading} efoId={efoId} name={name} />

      <RoutingTabs>
        <RoutingTab
          label="Associated targets"
          path="/disease/:efoId/associations"
          component={() => <ClassicAssociations efoId={efoId} name={name} />}
        />
        <RoutingTab
          label="Profile"
          path="/disease/:efoId"
          component={() => <Profile efoId={efoId} name={name} />}
        />
      </RoutingTabs>
    </BasePage>
  );
}

export default DiseasePage;
