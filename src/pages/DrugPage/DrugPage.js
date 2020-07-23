import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';

import { Tabs, Tab } from 'ot-ui';

import BasePage from '../../components/BasePage';
import EmptyPage from '../EmptyPage';
import Header from './Header';
import Profile from './Profile';

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

const DrugPage = ({ match, history, location }) => {
  const handleChange = (event, value) => {
    if (value.indexOf('http' === 0)) {
      // navigte to external page: first store current page
      // for back button to work correctly
      // TODO: this link will be removed after alpha/beta
      history.push(match.url);
      window.location.replace(value);
    } else {
      const path = value === 'overview' ? match.url : `${match.url}/${value}`;
      history.push(path);
    }
  };

  const tab = location.pathname.endsWith('associations')
    ? location.pathname.split('/').pop()
    : 'overview';

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

          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab value="overview" label="Profile" />
            <Tab
              value={`https://www.targetvalidation.org/summary?drug=${chemblId}`}
              label="View this page in the classic view"
            />
          </Tabs>

          <Switch>
            <Route
              path={match.path}
              render={() => (
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
          </Switch>
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
