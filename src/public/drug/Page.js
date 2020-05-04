import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';

import Header from './Header';
import Profile from './Profile';
import BasePage from '../common/BasePage';
import EmptyPage from '../common/EmptyPage';

const DRUG_QUERY = gql`
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

const DrugPage = ({ match }) => {
  const { chemblId } = match.params;

  const { loading, error, data } = useQuery(DRUG_QUERY, {
    variables: { chemblId },
  });

  if (loading || error) return null;

  const { drug } = data;

  return (
    <BasePage>
      <Helmet>
        <title>{drug ? drug.name : chemblId}</title>
      </Helmet>
      {drug ? (
        <>
          <Header chemblId={chemblId} name={drug.name} />
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
        </>
      ) : (
        <EmptyPage>
          <Typography>404 Page Not Found</Typography>
        </EmptyPage>
      )}
    </BasePage>
  );
};

export default DrugPage;
