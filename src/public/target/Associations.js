import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';

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

class TargetAssociationsPage extends React.Component {
  state = {
    indirects: true,
    dataSources: [],
    options: null,
    evidence: null,
  };
  handleIndirectsChange = indirects => {
    this.setState({ indirects });
  };
  handleDataSourcesChange = ({ dataSources, options }) => {
    this.setState({ dataSources, options });
  };
  handleCellClick = ({ efoId, dataSourceId }) => {
    const { evidence } = this.state;
    if (
      evidence &&
      evidence.efoId === efoId &&
      evidence.dataSourceId === dataSourceId
    ) {
      // clear
      this.setState({ evidence: null });
    } else {
      // set
      const newEvidence = { efoId, dataSourceId };
      this.setState({ evidence: newEvidence });
    }
  };
  render() {
    const { ensgId } = this.props;
    const { indirects, dataSources, options, evidence } = this.state;

    // have to strip __typename when using as input (__typename added by apollo cache)
    const dsOptions = dataSources.map(({ id, weight, reduceFunc }) => ({
      id,
      weight,
      reduceFunc,
    }));
    const { __typename, ...optionsMinusTypename } = options || {};
    const harmonicOptions =
      dsOptions.length > 0 && options
        ? { dsOptions, options: optionsMinusTypename }
        : null;

    // query variables
    let variables = harmonicOptions
      ? { ensgId, indirects, harmonicOptions, page }
      : { ensgId, indirects, page };
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ApolloProvider client={client}>
            <Query query={targetAssociationsQuery} variables={variables}>
              {({ loading, error, data }) => {
                const rows =
                  (data &&
                    data.associationsByTargetId &&
                    data.associationsByTargetId.rows) ||
                  [];
                const metadata =
                  (data &&
                    data.associationsByTargetId &&
                    data.associationsByTargetId.metadata) ||
                  {};
                return (
                  <AssociationsTable
                    {...{ rows, indirects, dataSources, options, metadata }}
                    onIndirectsChange={this.handleIndirectsChange}
                    onDataSourcesChange={this.handleDataSourcesChange}
                    onCellClick={this.handleCellClick}
                  />
                );
              }}
            </Query>
          </ApolloProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          {evidence
            ? `Showing evidence for (${ensgId}, ${evidence.efoId}) from ${
                evidence.dataSourceId
              }`
            : 'Click a cell to see the evidence behind it'}
        </Grid>
      </Grid>
    );
  }
}

export default TargetAssociationsPage;
