import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import BasePage from '../../components/BasePage';
import Header from './Header';
import { oldPlatformUrl } from '../../constants';
import Profile from './Profile';
import { RoutingTab, RoutingTabs } from '../../components/RoutingTabs';

const DRUG_PAGE_QUERY = gql`
  query DrugQuery($chemblId: String!) {
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

const DrugPage = ({ match, history, location }) => {
  const { chemblId } = match.params;
  const { loading, data } = useQuery(DRUG_PAGE_QUERY, {
    variables: { chemblId },
  });

  if (loading) return null;
  if (data && !data.drug) {
    return <Redirect to={{ pathname: '/notFoundPage' }} />;
  }

  const { drug } = data;

  return (
    <BasePage>
      <Helmet>
        <title>{drug ? drug.name : chemblId}</title>
      </Helmet>
      <Header chemblId={chemblId} name={drug.name} />

      <RoutingTabs>
        <RoutingTab
          label="Profile"
          path="/drug/:chemblId/profile"
          component={() => (
            <Profile
              chemblId={chemblId}
              name={drug.name}
              description={drug.description}
              type={drug.drugType}
              tradeNames={drug.tradeNames}
              maximumClinicalTrialPhase={drug.maximumClinicalTrialPhase}
              yearOfFirstApproval={drug.yearOfFirstApproval}
              synonyms={drug.synonyms}
              hasBeenWithdrawn={drug.hasBeenWithdrawn}
              withdrawnNotice={drug.withdrawnNotice}
            />
          )}
        />
        <RoutingTab
          label="Classic view"
          url={`${oldPlatformUrl}/summary?drug=${chemblId}`}
        />
      </RoutingTabs>
    </BasePage>
  );
};

export default DrugPage;
