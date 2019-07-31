import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import AssociationsTable from './AssociationsTable';

const targetAssociationsQuery = gql`
  query TargetAssociationsQuery(
    $ensgId: String!
    $indirects: Boolean!
    $harmonicOptions: HarmonicInput
    $page: Pagination
  ) {
    associationsByTargetId(
      targetId: $ensgId
      indirects: $indirects
      harmonicOptions: $harmonicOptions
      page: $page
    ) {
      metadata {
        options {
          maxVectorElements
          pExponent
          reduceFunc
        }
        dsOptions {
          id
          weight
          reduceFunc
        }
      }
      rows {
        obj {
          id
          name
        }
        score
        dsScores
        evsCount
      }
    }
  }
`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api-dora-dot-open-targets-eu-dev.appspot.com/graphql',
  }),
  cache: new InMemoryCache(),
});

// TODO: when api returns total, use smaller page size
const page = { index: 0, size: 10000 };

const TargetAssociationsPage = ({ ensgId }) => (
  <ApolloProvider client={client}>
    <Query
      query={targetAssociationsQuery}
      variables={{ ensgId, indirects: false, page }}
    >
      {({ loading, error, data, fetchMore }) => {
        const rows =
          (data &&
            data.associationsByTargetId &&
            data.associationsByTargetId.rows) ||
          [];
        const metadata =
          (data &&
            data.associationsByTargetId &&
            data.associationsByTargetId.metadata) ||
          null;
        return (
          <AssociationsTable
            rows={rows}
            metadata={metadata}
            onUpdate={({ harmonicOptions }) =>
              fetchMore({
                variables: { harmonicOptions },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return fetchMoreResult;
                },
              })
            }
          />
        );
      }}
    </Query>
  </ApolloProvider>
);

export default TargetAssociationsPage;
