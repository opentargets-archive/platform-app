import React from 'react';
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

const diseaseAssociationsQuery = gql`
  query DiseaseAssociationsQuery(
    $efoId: String!
    $indirects: Boolean!
    $harmonicOptions: HarmonicInput
    $page: Pagination
  ) {
    associationsByDiseaseId(
      diseaseId: $efoId
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

class DiseaseAssociationsPage extends React.Component {
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
  handleCellClick = ({ ensgId, name, dataSourceId }) => {
    const { evidence } = this.state;
    if (
      evidence &&
      evidence.ensgId === ensgId &&
      evidence.dataSourceId === dataSourceId
    ) {
      // clear
      this.setState({ evidence: null });
    } else {
      // set
      const newEvidence = { ensgId, name, dataSourceId };
      this.setState({ evidence: newEvidence });
    }
  };
  render() {
    const { efoId, name } = this.props;
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
      ? { efoId, indirects, harmonicOptions, page }
      : { efoId, indirects, page };
    return (
      <Grid style={{ marginTop: '8px' }} container spacing={2}>
        <Grid item xs={12} md={6}>
          <ApolloProvider client={client}>
            <Query query={diseaseAssociationsQuery} variables={variables}>
              {({ loading, error, data }) => {
                const rows =
                  (data &&
                    data.associationsByDiseaseId &&
                    data.associationsByDiseaseId.rows) ||
                  [];
                const metadata =
                  (data &&
                    data.associationsByDiseaseId &&
                    data.associationsByDiseaseId.metadata) ||
                  {};
                return (
                  <Card elevation={0}>
                    <CardHeader
                      title="Associations"
                      subheader={
                        <React.Fragment>
                          <strong>{commaSeparate(rows.length)}</strong> diseases
                          associated with <strong>{name}</strong>
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
                    Showing evidence between <strong>{name}</strong> and{' '}
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
                  efoId={efoId}
                  ensgId={evidence.ensgId}
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

export default DiseaseAssociationsPage;
