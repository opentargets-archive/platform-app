import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Tabs, Tab } from 'ot-ui';

import BasePage from '../common/BasePage';
import Header from './Header';
import Profile from './Profile';

// TODO: implement summaries in graphql api and use (like in target page)

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
    // const { efoId } = match.params;

    // TODO: replace with valid query values
    const chemblId = 'CHEMBL2111100';
    const name = 'Mifamurtide';
    const type = 'smallMolecule';
    const maxPhase = 4;
    const firstApproval = null;
    const molecularFormula = null;

    const synonyms = ['L-MTP-PE', 'Mifamurtide'];
    return (
      <BasePage>
        {/* <Query query={diseaseQuery} variables={{ efoId }}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return null;
            }
            const { name, description, synonyms } = data.disease;

            
            
            return ( */}
        <Fragment>
          <Helmet>
            <title>{name}</title>
          </Helmet>
          <Header
            {...{
              chemblId,
              name,
              type,
              maxPhase,
              firstApproval,
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
                <Profile
                  {...{
                    chemblId,
                    name,
                    type,
                    maxPhase,
                    firstApproval,
                    molecularFormula,
                    description: null,
                    synonyms,
                  }}
                />
              )}
            />
          </Switch>
        </Fragment>
        {/* );
          }}
        </Query> */}
      </BasePage>
    );
  }
}

export default DrugPage;
