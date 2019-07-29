import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import * as d3 from 'd3';
import withTheme from '@material-ui/core/styles/withTheme';

import { Link } from 'ot-ui';
import AssociationsTable from '../common/AssociationsTable';

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

const HeatmapCell = ({ value, colorScale }) => (
  <span
    style={{
      display: 'block',
      width: '16px',
      height: '16px',
      background: colorScale(value),
    }}
    title={`Score: ${value}`}
  />
);

const columns = (dataSources, colorScale) => [
  {
    id: 'disease',
    label: 'Disease',
    renderCell: d => <Link to={`/disease/${d.obj.id}`}>{d.obj.name}</Link>,
    comparator: (a, b) => d3.ascending(a.obj.name, b.obj.name),
  },
  {
    id: 'score',
    label: 'Score',
    verticalHeader: true,
    renderCell: d => <HeatmapCell value={d.score} colorScale={colorScale} />,
  },
  ...dataSources.map(c => ({
    id: c.id,
    label: c.name,
    verticalHeader: true,
    renderCell: d => (
      <HeatmapCell value={d.dsScores[c.position]} colorScale={colorScale} />
    ),
    comparator: (a, b) =>
      d3.ascending(a.dsScores[c.position], b.dsScores[c.position]),
  })),
];

const TargetAssociationsPage = ({ ensgId, theme }) => {
  const colorScale = d3
    .scaleLinear()
    .domain([0, Math.PI ** 2 / 6])
    .range(['#fff', theme.palette.primary.main]);
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
            <AssociationsTable
              loading={false}
              error={false}
              columns={columns(dataSources, colorScale)}
              data={rows}
            />
          );
        }}
      </Query>
    </ApolloProvider>
  );
};

export default withTheme()(TargetAssociationsPage);
