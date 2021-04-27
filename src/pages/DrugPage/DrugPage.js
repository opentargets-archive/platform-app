import React from 'react';
import { gql, useQuery } from '@apollo/client';

import BasePage from '../../components/BasePage';
import ScrollToTop from '../../components/ScrollToTop';
import Header from './Header';
import NotFoundPage from '../NotFoundPage';
import Profile from '../DrugPage/Profile';
import { RoutingTab, RoutingTabs } from '../../components/RoutingTabs';

const DRUG_PAGE_QUERY = gql`
  query DrugPageQuery($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      name
      crossReferences {
        source
        reference
      }
    }
  }
`;

function DrugPage({ match }) {
  const { chemblId } = match.params;
  const { loading, data } = useQuery(DRUG_PAGE_QUERY, {
    variables: { chemblId },
  });

  if (data && !data.drug) {
    return <NotFoundPage />;
  }

  const { name, crossReferences } = data?.drug || {};

  return (
    <BasePage title={name || chemblId}>
      <Header
        loading={loading}
        chemblId={chemblId}
        name={name}
        crossReferences={crossReferences}
      />
      <ScrollToTop />

      <RoutingTabs>
        <RoutingTab
          label="Profile"
          path="/drug/:chemblId"
          component={() => <Profile chemblId={chemblId} name={name} />}
        />
      </RoutingTabs>
    </BasePage>
  );
}

export default DrugPage;
