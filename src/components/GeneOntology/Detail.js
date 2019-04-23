import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import OntologyTable from './OntologyTable';

const query = gql`
  query GeneOntologyQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        geneOntology {
          rows {
            id
            term
            category
          }
        }
      }
    }
  }
`;

const GeneOntologyDetail = ({ symbol, ensgId }) => {
  return (
    <Query query={query} variables={{ ensgId }}>
      {({ loading, error, data }) => {
        if (loading || error) return null;

        const { rows } = data.target.details.geneOntology;
        return <OntologyTable rows={rows} symbol={symbol} />;
      }}
    </Query>
  );
};

export default GeneOntologyDetail;
