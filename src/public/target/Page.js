import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Query } from '@apollo/react-components';
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

class TargetPage extends Component {
  handleChange = (event, value) => {
    const { history, match } = this.props;
    const path = value === 'overview' ? match.url : `${match.url}/${value}`;
    history.push(path);
  };

  render() {
    const { location, match } = this.props;
    const tab = location.pathname.endsWith('associations')
      ? location.pathname.split('/').pop()
      : 'overview';
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
                  value={tab}
                  onChange={this.handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab
                    value="classic-associations"
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
