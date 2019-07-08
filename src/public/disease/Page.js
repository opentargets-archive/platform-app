import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import { Tabs, Tab } from 'ot-ui';

import BasePage from '../common/BasePage';
import Associations from './Associations';
import Header from './Header';
import Profile from './Profile';

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

class DiseasePage extends Component {
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
                  <Tab value="associations" label="Associations View" />
                  <Tab value="overview" label="Disease Profile" />
                </Tabs>
                <Switch>
                  <Route
                    path={`${match.path}/associations`}
                    component={Associations}
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
