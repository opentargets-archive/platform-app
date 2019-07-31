import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import Header from './Header';
import Profile from './Profile';

const drugQuery = gql`
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

class DrugPage extends Component {
  render() {
    const { chemblId } = this.props.match.params;

    return (
      <Query query={drugQuery} variables={{ chemblId }}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }
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
            <Fragment>
              <Helmet>
                <title>{name}</title>
              </Helmet>
              <Header
                {...{
                  chemblId,
                  name,
                  type,
                  tradeNames,
                  maximumClinicalTrialPhase,
                  yearOfFirstApproval,
                  synonyms,
                  hasBeenWithdrawn,
                  withdrawnNotice,
                }}
              />
              <Profile
                {...{
                  chemblId,
                  name,
                  type,
                  tradeNames,
                  maximumClinicalTrialPhase,
                  yearOfFirstApproval,
                  description: null,
                  synonyms,
                }}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(DrugPage);
