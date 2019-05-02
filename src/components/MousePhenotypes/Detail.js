import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import PhenotypesTable from './PhenotypesTable';
import AssociationSummary from '../AssociationSummary';

const query = gql`
  query MousePhenotypesQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        mousePhenotypes {
          categories {
            id
            name
            isAssociated
          }
          rows {
            mouseGeneId
            mouseGeneSymbol
            categoryLabel
            phenotypeLabel
            subjectAllelicComposition
            subjectBackground
            pmIds
          }
        }
      }
    }
  }
`;

const MousePhenotypesDetail = ({ ensgId }) => {
  return (
    <Query query={query} variables={{ ensgId }}>
      {({ loading, error, data }) => {
        if (loading || error) return null;

        const { categories, rows } = data.target.details.mousePhenotypes;

        return (
          <Fragment>
            <AssociationSummary data={categories} />
            <PhenotypesTable rows={rows} />
          </Fragment>
        );
      }}
    </Query>
  );
};

export default MousePhenotypesDetail;
