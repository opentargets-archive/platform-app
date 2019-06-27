import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import { Tabs, Tab } from 'ot-ui';

import BasePage from '../common/BasePage';
import Header from './Header';
import Associations from './Associations';
import Profile from './Profile';

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

            return (
              <React.Fragment>
                <Helmet>
                  <title>{symbol}</title>
                </Helmet>
                <Header {...{ ensgId, uniprotId, symbol, name }} />
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
                    component={Associations}
                  />
                  <Route
                    path={match.path}
                    render={() => (
                      <Profile
                        {...{
                          ensgId,
                          uniprotId,
                          symbol,
                          name,
                          synonyms,
                          description,
                        }}
                      />
                    )}
                  />
                </Switch>
              </React.Fragment>
            );
          }}
        </Query>
      </BasePage>
    );
  }
}

export default TargetPage;
