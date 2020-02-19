import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import Header from './Header';
import Profile from './Profile';
import BasePage from '../common/BasePage';

const DRUG_QUERY = gql`
  query DrugQuery($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      name
      synonyms
      tradeNames
      yearOfFirstApproval
      type
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

  const {
    name,
    synonyms,
    tradeNames,
    yearOfFirstApproval,
    type,
    maximumClinicalTrialPhase,
    hasBeenWithdrawn,
    withdrawnNotice,
  } = data.drug;

  return (
    <BasePage>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <Header chemblId={chemblId} name={name} />
      <Profile
        chemblId={chemblId}
        name={name}
        type={type}
        tradeNames={tradeNames}
        maximumClinicalTrialPhase={maximumClinicalTrialPhase}
        yearOfFirstApproval={yearOfFirstApproval}
        description={null}
        synonyms={synonyms}
        hasBeenWithdrawn={hasBeenWithdrawn}
        withdrawnNotice={withdrawnNotice}
      />
    </BasePage>
  );
};

export default DrugPage;
