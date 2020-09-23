import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import BasePage from '../../components/BasePage';
import ClassicAssociations from './ClassicAssociations';
import Header from './Header';
import { oldPlatformUrl } from '../../constants';
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

  // TODO: handle errors/loading
  if (data && !data.disease) {
    return <Redirect to={{ pathname: '/notFoundPage' }} />;
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
        <RoutingTab
          label="Classic view"
          url={`${oldPlatformUrl}/disease/${efoId}/associations`}
        />
      </RoutingTabs>
    </BasePage>
  );
}

export default DiseasePage;
