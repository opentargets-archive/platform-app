import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import Header from './Header';
import Profile from './Profile';
import BasePage from '../common/BasePage';
import { client2 } from '../client';

const DRUG_QUERY = gql`
  query DrugQuery($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      name
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

// const DRUG_QUERY = gql`
//   query DrugQuery($chemblId: String!) {
//     drug(chemblId: $chemblId) {
//       id
//       name
//       synonyms
//       tradeNames
//       yearOfFirstApproval
//       type
//       maximumClinicalTrialPhase
//       hasBeenWithdrawn
//       withdrawnNotice {
//         classes
//         countries
//         reasons
//         year
//       }
//       internalCompound
//     }
//   }
// `;

const DrugPage = ({ match }) => {
  const { chemblId } = match.params;

  const { loading, error, data } = useQuery(DRUG_QUERY, {
    client: client2,
    variables: { chemblId },
  });

  if (loading || error) return null;

  const {
    name,
    drugType,
    synonyms,
    tradeNames,
    yearOfFirstApproval,
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
        type={drugType}
        tradeNames={tradeNames}
        maximumClinicalTrialPhase={maximumClinicalTrialPhase}
        yearOfFirstApproval={yearOfFirstApproval}
        synonyms={synonyms}
        hasBeenWithdrawn={hasBeenWithdrawn}
        withdrawnNotice={withdrawnNotice}
      />
    </BasePage>
  );
};

export default DrugPage;
