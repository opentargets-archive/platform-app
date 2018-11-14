import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import BasePage from './BasePage';
import TargetSummary from '../components/TargetSummary';
import TargetTabs from '../components/TargetTabs';

const targetQuery = gql`
  query TargetQuery($ensgId: String!) {
    targetSummary(ensgId: $ensgId) {
      id
      name
      symbol
      description
      synonyms
    }
  }
`;

const TargetPage = ({ match }) => {
  const { ensgId } = match.params;
  return (
    <BasePage>
      <Query query={targetQuery} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }

          const { symbol, name, synonyms, description } = data.targetSummary;
          return (
            <Fragment>
              <TargetSummary
                symbol={symbol}
                name={name}
                synonyms={synonyms}
                descript={description}
              />
              <TargetTabs />
            </Fragment>
          );
        }}
      </Query>
    </BasePage>
  );
};

export default TargetPage;
