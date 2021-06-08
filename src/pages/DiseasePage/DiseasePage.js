import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import BasePage from '../../components/BasePage';
import ScrollToTop from '../../components/ScrollToTop';
import ClassicAssociations from './ClassicAssociations';
import Header from './Header';
import NotFoundPage from '../NotFoundPage';
import Profile from './Profile';
import { RoutingTab, RoutingTabs } from '../../components/RoutingTabs';

const DISEASE_PAGE_QUERY = loader('./DiseasePage.gql');

function DiseasePage({ location, match }) {
  const { efoId } = match.params;
  const { loading, data } = useQuery(DISEASE_PAGE_QUERY, {
    variables: { efoId },
  });

  if (data && !data.disease) {
    return <NotFoundPage />;
  }

  const { name } = data?.disease || {};

  return (
    <BasePage
      title={
        location.pathname.includes('associations')
          ? `Targets associated with ${name}`
          : `${name} profile page`
      }
      description={
        location.pathname.includes('associations')
          ? `Ranked list of targets associated with ${name}`
          : `Annotation information for ${name}`
      }
      location={location}
    >
      <Header loading={loading} efoId={efoId} name={name} />
      <ScrollToTop />
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
