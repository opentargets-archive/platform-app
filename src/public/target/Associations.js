import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { commaSeparate } from 'ot-ui';

import AssociationsTable from './AssociationsTable';
import AssociationsEvidenceTable from '../common/AssociationsEvidenceTable';

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
  handleCellClick = ({ efoId, name, dataSourceId }) => {
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
      const newEvidence = { efoId, name, dataSourceId };
      this.setState({ evidence: newEvidence });
    }
  };
  render() {
    const { ensgId, symbol } = this.props;
    const { indirects, dataSources, options, evidence } = this.state;

    // have to strip __typename when using as input (__typename added by apollo cache)
    const dsOptions = dataSources
      .map(({ id, weight, reduceFunc }) => ({
        id,
        weight,
        reduceFunc,
      }))
      .sort((a, b) => d3.ascending(a.id, b.id)); // must be in ascending order for query (!)
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
      <Grid style={{ marginTop: '8px' }} container spacing={16}>
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
                  <Card elevation={0}>
                    <CardHeader
                      title="Associations"
                      subheader={
                        <React.Fragment>
                          <strong>{commaSeparate(rows.length)}</strong> diseases
                          associated with <strong>{symbol}</strong>
                        </React.Fragment>
                      }
                    />
                    <CardContent>
                      <AssociationsTable
                        {...{
                          rows,
                          indirects,
                          dataSources,
                          options,
                          metadata,
                          evidence,
                        }}
                        onIndirectsChange={this.handleIndirectsChange}
                        onDataSourcesChange={this.handleDataSourcesChange}
                        onCellClick={this.handleCellClick}
                      />
                    </CardContent>
                  </Card>
                );
              }}
            </Query>
          </ApolloProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0}>
            <CardHeader
              title="Evidence"
              subheader={
                evidence ? (
                  <React.Fragment>
                    Showing evidence between <strong>{symbol}</strong> and{' '}
                    <strong>{evidence.name}</strong> from{' '}
                    <strong>
                      {_.startCase(evidence.dataSourceId.split('__')[1])}
                    </strong>
                  </React.Fragment>
                ) : (
                  'Click a cell to see the evidence behind it'
                )
              }
            />
            {evidence ? (
              <CardContent>
                <AssociationsEvidenceTable
                  ensgId={ensgId}
                  efoId={evidence.efoId}
                  dataSourceId={evidence.dataSourceId}
                  indirects={indirects}
                />
              </CardContent>
            ) : null}
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default TargetAssociationsPage;
