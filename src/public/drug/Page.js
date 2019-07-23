import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import { Tabs, Tab } from 'ot-ui';

import BasePage from '../common/BasePage';
import Header from './Header';
import Profile from './Profile';
import WithdrawnNotice from './WithdrawnNotice';

// TODO: implement summaries in graphql api and use (like in target page)
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
    }
  }
`;

class DrugPage extends Component {
  state = {};

  static getDerivedStateFromProps(props) {
    const value = props.location.pathname.endsWith('/associations')
      ? 'associations'
      : 'overview';

    return {
      value,
    };
  }

  // handleChange = (event, value) => {
  //   const { history, match } = this.props;
  //   this.setState({ value }, () => {
  //     history.push(
  //       `${match.url}${value === 'overview' ? '' : '/associations'}`
  //     );
  //   });
  // };

  render() {
    const { match } = this.props;
    const { value } = this.state;
    const { chemblId } = match.params;

    const molecularFormula = null;

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
                <Header
                  {...{
                    chemblId,
                    name,
                    type,
                    tradeNames,
                    maximumClinicalTrialPhase,
                    yearOfFirstApproval,
                    molecularFormula,
                    synonyms,
                  }}
                />
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab value="overview" label="Drug Profile" />
                </Tabs>
                <Switch>
                  <Route
                    path={match.path}
                    render={() => (
                      <React.Fragment>
                        <WithdrawnNotice
                          {...{ hasBeenWithdrawn, withdrawnNotice }}
                        />
                        <Profile
                          {...{
                            chemblId,
                            name,
                            type,
                            tradeNames,
                            maximumClinicalTrialPhase,
                            yearOfFirstApproval,
                            molecularFormula,
                            description: null,
                            synonyms,
                          }}
                        />
                      </React.Fragment>
                    )}
                  />
                </Switch>
              </Fragment>
            );
          }}
        </Query>
      </BasePage>
    );
  }
}

export default DrugPage;
