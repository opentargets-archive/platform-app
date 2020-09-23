import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import BasePage from '../../components/BasePage';
import Header from './Header';
import { oldPlatformUrl } from '../../constants';
import Profile from '../DrugPage/Profile';
import { RoutingTab, RoutingTabs } from '../../components/RoutingTabs';

const DRUG_PAGE_QUERY = gql`
  query DrugPageQuery($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      name
      description
      drugType
      synonyms
      tradeNames
      yearOfFirstApproval
      maximumClinicalTrialPhase
      hasBeenWithdrawn
      withdrawnNotice {
        classes
        countries
        reasons
        year
      }
      internalCompound
    }
  }
`;

function DrugPage({ match }) {
  const { chemblId } = match.params;
  const { data } = useQuery(DRUG_PAGE_QUERY, { variables: { chemblId } });

  // TODO: handle errors/loading
  if (data && !data.drug) {
    return <Redirect to={{ pathname: '/notFoundPage' }} />;
  }

  return (
    <BasePage title={data?.drug.name || chemblId}>
      <Header chemblId={chemblId} name={data?.drug.name} />

      <RoutingTabs>
        <RoutingTab
          label="Profile"
          path="/drug/:chemblId"
          component={Profile}
        />
        <RoutingTab
          label="View this page in the classic view"
          url={`${oldPlatformUrl}/summary?drug=${chemblId}`}
        />
      </RoutingTabs>
    </BasePage>
  );
}

export default DrugPage;
