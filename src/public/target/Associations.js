import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import * as d3 from 'd3';

import { Link, OtTableRF, significantFigures } from 'ot-ui';

const targetAssociationsQuery = gql`
  query TargetAssociationsQuery($ensgId: String!, $indirects: Boolean!) {
    associationsByTargetId(targetId: $ensgId, indirects: $indirects) {
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

const columns = dataSources => [
  {
    id: 'disease',
    label: 'Disease',
    renderCell: d => <Link to={`/disease/${d.obj.id}`}>{d.obj.name}</Link>,
    comparator: (a, b) => d3.ascending(a.obj.name, b.obj.name),
  },
  {
    id: 'score',
    label: 'Score',
    renderCell: d => significantFigures(d.score),
  },
  ...dataSources.map(c => ({
    id: c.id,
    label: c.name,
    renderCell: d => significantFigures(d.dsScores[c.position]),
    comparator: (a, b) =>
      d3.ascending(a.dsScores[c.position], b.dsScores[c.position]),
  })),
];

const TargetAssociationsPage = ({ ensgId }) => {
  return (
    <ApolloProvider client={client}>
      <Query
        query={targetAssociationsQuery}
        variables={{ ensgId, indirects: true }}
      >
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }
          const { rows, metadata } = data.associationsByTargetId;
          const { dsOptions: dataSourcesRaw } = metadata;
          const dataSources = dataSourcesRaw.map((d, i) => ({
            ...d,
            name: _.startCase(d.id.split('__')[1]),
            position: i,
          }));

          return (
            <OtTableRF
              loading={false}
              error={false}
              columns={columns(dataSources)}
              data={rows}
            />
          );
        }}
      </Query>
    </ApolloProvider>
  );
};

export default TargetAssociationsPage;
