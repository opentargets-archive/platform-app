import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import { Tabs, Tab } from 'ot-ui';

import Associations from './Associations';
import ClassicAssociations from './ClassicAssociations';
import Header from './Header';
import Profile from './Profile';
import BasePage from '../common/BasePage';

const diseaseQuery = gql`
  query DiseaseQuery($efoId: String!) {
    disease(efoId: $efoId) {
      id
      name
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

class DiseasePage extends Component {
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
    const { efoId } = match.params;

    return (
      <BasePage>
        <Query query={diseaseQuery} variables={{ efoId }}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return null;
            }
            const { name, description, synonyms } = data.disease;

            return (
              <Fragment>
                <Helmet>
                  <title>{name}</title>
                </Helmet>
                <Header {...{ efoId, name, description, synonyms }} />
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
                          efoId,
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
                          efoId,
                          name,
                        }}
                      />
                    )}
                  />
                  <Route
                    path={match.path}
                    render={() => (
                      <Profile {...{ efoId, name, description, synonyms }} />
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

export default DiseasePage;
