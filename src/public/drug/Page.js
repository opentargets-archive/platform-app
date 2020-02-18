import React, { Fragment, Component } from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import Header from './Header';
import Profile from './Profile';
import BasePage from '../common/BasePage';

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
      <BasePage>
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
                <Header chemblId={chemblId} name={name} />
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
                    hasBeenWithdrawn,
                    withdrawnNotice,
                  }}
                />
              </Fragment>
            );
          }}
        </Query>
      </BasePage>
    );
  }
}

export default DrugPage;
