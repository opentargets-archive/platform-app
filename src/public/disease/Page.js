import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import { Tabs, Tab } from 'ot-ui';

import BasePage from '../../pages/BasePage';
import Associations from './Associations';
import Header from './Header';
import DiseaseOverviewTab from './DiseaseOverviewTab';

// const diseaseQuery = gql`
//   query DiseaseQuery($efoId: String!) {
//     disease(efoId: $efoId) {
//       id
//       name
//       description
//       synonyms
//     }
//   }
// `;

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
    // const { efoId } = match.params;

    // TODO: replace with valid query values
    const efoId = 'EFO_0003106';
    const name = 'pneumonia';
    const description =
      'A lung disease that involves lung parenchyma or alveolar inflammation and abnormal alveolar filling with fluid (consolidation and exudation). It results from a variety of causes including infection with bacteria, viruses, fungi or parasites, and chemical or physical injury to the lungs. It is accompanied by fever, chills, cough, and difficulty in breathing.';
    const synonyms = [
      'Pneumonia due to other specified organism',
      'chest infection due to pneumonia',
      'acute pneumonia',
      'Pneumonia due to other specified organisms (disorder)',
      'Pneumonia due to other specified organisms',
    ];
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
          <Header {...{ efoId, name, description, synonyms }} />
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab value="associations" label="Associations View" />
            <Tab value="overview" label="Disease Profile Overview" />
          </Tabs>
          <Switch>
            <Route
              path={`${match.path}/associations`}
              component={Associations}
            />
            <Route
              path={match.path}
              render={() => <DiseaseOverviewTab efoId={efoId} />}
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

export default DiseasePage;
