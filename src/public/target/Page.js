import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import { Tabs, Tab } from 'ot-ui';

import Header from './Header';
import ClassicAssociations from './ClassicAssociations';
import Associations from './Associations';
import Profile from './Profile';
import BasePage from '../common/BasePage';

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

const valueToUrlSuffixMap = {
  classicAssociations: '/classic-associations',
  associations: '/associations',
  overview: '',
};
const urlSuffixToValueMap = Object.entries(valueToUrlSuffixMap).reduce(
  (acc, [k, v]) => {
    acc[v] = k;
    return acc;
  },
  {}
);

class TargetPage extends Component {
  state = {};

  static getDerivedStateFromProps(props) {
    const suffix = props.location.pathname.endsWith('associations')
      ? `/${props.location.pathname.split('/').pop()}`
      : '';
    const value = urlSuffixToValueMap[suffix];
    return {
      value,
    };
  }

  handleChange = (event, value) => {
    const { history, match } = this.props;
    this.setState({ value }, () => {
      const suffix = valueToUrlSuffixMap[value];
      history.push(`${match.url}${suffix}`);
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
                  <Tab
                    value="classicAssociations"
                    label="Associations (classic)"
                  />
                  <Tab value="associations" label="Associations (dynamic)" />
                  <Tab value="overview" label="Profile" />
                </Tabs>
                <Switch>
                  <Route
                    path={`${match.path}/classic-associations`}
                    render={() => (
                      <ClassicAssociations
                        {...{
                          ensgId,
                          uniprotId,
                          symbol,
                          name,
                        }}
                      />
                    )}
                  />
                  <Route
                    path={`${match.path}/associations`}
                    render={() => (
                      <Associations
                        {...{
                          ensgId,
                          uniprotId,
                          symbol,
                          name,
                        }}
                      />
                    )}
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
