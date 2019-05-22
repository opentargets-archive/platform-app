import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import { Tabs, Tab } from 'ot-ui';

import TargetSummaryContext from '../contexts/TargetSummaryContext';

import BasePage from './BasePage';
import TargetAssociationsPage from './TargetAssociationsPage';
import TargetSummary from '../components/TargetSummary';
import OverviewTab from '../components/OverviewTabLayout1';

const targetQuery = gql`
  query TargetQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      name
      uniprotId
      symbol
      description
      synonyms
    }
  }
`;

class TargetPage extends Component {
  state = {};

  static getDerivedStateFromProps(props) {
    const value = props.location.pathname.endsWith('/associations')
      ? 'associations'
      : 'overview';

    return {
      value,
    };
  }

  handleChange = (event, value) => {
    const { history, match } = this.props;
    this.setState({ value }, () => {
      history.push(
        `${match.url}${value === 'overview' ? '' : '/associations'}`
      );
    });
  };

  render() {
    const { match } = this.props;
    const { value } = this.state;
    const { ensgId } = match.params;

    return (
      <BasePage>
        <Query query={targetQuery} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return null;
            }

            const {
              symbol,
              name,
              uniprotId,
              synonyms,
              description,
            } = data.target;

            const context = {
              ensgId,
              uniprotId,
              symbol,
              name,
              synonyms,
              description,
            };

            return (
              <TargetSummaryContext.Provider value={context}>
                <Helmet>
                  <title>{symbol}</title>
                </Helmet>
                <TargetSummary
                  ensgId={ensgId}
                  symbol={symbol}
                  name={name}
                  uniprotId={uniprotId}
                  synonyms={synonyms}
                  description={description}
                />
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab value="associations" label="Associations View" />
                  <Tab value="overview" label="Target Profile Overview" />
                </Tabs>
                <Switch>
                  <Route
                    path={`${match.path}/associations`}
                    component={TargetAssociationsPage}
                  />
                  <Route
                    path={match.path}
                    render={() => <OverviewTab {...{ ensgId, symbol, name }} />}
                  />
                </Switch>
              </TargetSummaryContext.Provider>
            );
          }}
        </Query>
      </BasePage>
    );
  }
}

export default TargetPage;
