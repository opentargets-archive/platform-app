import React, { Fragment, Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

// import { Tabs, Tab } from 'ot-ui';

import Header from './Header';
import Profile from './Profile';
import BasePage from '../common/BasePage';

const evidenceQuery = gql`
  query EvidenceQuery($ensgId: String!, $efoId: String!) {
    target(ensgId: $ensgId) {
      id
      name
      uniprotId
      symbol
      description
      synonyms
    }
    disease(efoId: $efoId) {
      id
      name
      description
      synonyms
    }
  }
`;

class EvidencePage extends Component {
  // state = {};

  // static getDerivedStateFromProps(props) {
  //   const value = props.location.pathname.endsWith('/associations')
  //     ? 'associations'
  //     : 'overview';

  //   return {
  //     value,
  //   };
  // }

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
    // const { value } = this.state;
    const { ensgId, efoId } = match.params;

    return (
      <BasePage>
        <Query query={evidenceQuery} variables={{ ensgId, efoId }}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return null;
            }
            const { target, disease } = data;

            return (
              <Fragment>
                <Helmet>
                  <title>{`Evidence for ${target.symbol} in ${disease.name}`}</title>
                </Helmet>
                <Header
                  {...{
                    target,
                    disease,
                  }}
                />
                <Profile
                  {...{
                    ensgId,
                    efoId,
                    target,
                    disease,
                  }}
                />
                {/* <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab value="overview" label="Evidence" />
          </Tabs>
          <Switch>
            <Route
              path={match.path}
              render={() => (
                <Profile
                  {...{
                    target, disease
                  }}
                />
              )}
            />
          </Switch> */}
              </Fragment>
            );
          }}
        </Query>
      </BasePage>
    );
  }
}

export default EvidencePage;
