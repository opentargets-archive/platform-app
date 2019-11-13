import React, { Fragment, Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

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
  render() {
    const { match } = this.props;
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
              </Fragment>
            );
          }}
        </Query>
      </BasePage>
    );
  }
}

export default EvidencePage;
