import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BasePage from './BasePage';
import TargetAssociationsPage from './TargetAssociationsPage';
import TargetSummary from '../components/TargetSummary';
import OverviewTab from '../components/OverviewTab';

const targetQuery = gql`
  query TargetQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      name
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

            const { symbol, name, synonyms, description } = data.target;
            return (
              <Fragment>
                <TargetSummary
                  symbol={symbol}
                  name={name}
                  synonyms={synonyms}
                  description={description}
                />
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  scrollable
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
                    render={() => (
                      <OverviewTab ensgId={ensgId} symbol={symbol} />
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

export default TargetPage;
