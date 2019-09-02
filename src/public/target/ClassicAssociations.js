import React from 'react';
import _ from 'lodash';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import { commaSeparate } from 'ot-ui';

import * as facetsObject from './facetIndex';
import ClassicAssociationsTable from './ClassicAssociationsTable';

const facets = Object.values(facetsObject);

const associationsQuery = gql`
  query TargetAssociationsQuery(
    $ensgId: String!
    $first: Int
    $after: String
    $facets: TargetDiseasesConnectionFacetsInput
    $sortBy: TargetDiseasesConnectionSortByInput
    $search: String
  ) {
    target(ensgId: $ensgId) {
      id
      diseasesConnection(
        first: $first
        after: $after
        facets: $facets
        sortBy: $sortBy
        search: $search
      ) {
        totalCount
        pageInfo {
          nextCursor
          hasNextPage
        }
        edges {
          node {
            id
            name
          }
          score
          scoresByDataType {
            dataTypeId
            score
          }
        }
        facets {
          ${facets
            .filter(f => f.facetQuery)
            .map(
              s => `...targetDiseasesConnection${_.upperFirst(s.id)}Fragment`
            )
            .join('\n')}
        }
      }
    }
  }
  ${facets
    .filter(s => s.facetQuery)
    .map(s => print(s.facetQuery))
    .join('\n')}
`;

const facetsStateDefault = facets.reduce((acc, f) => {
  acc[f.id] = f.stateDefault;
  return acc;
}, {});

class ClassicAssociations extends React.Component {
  state = {
    first: 50,
    after: null,
    page: 1,
    facets: facetsStateDefault,
    search: '',
    searchDebouced: '',
    sortBy: { field: 'SCORE_OVERALL', ascending: false },
  };
  handlePaginationChange = () => {
    // TODO
  };
  handleSortByChange = sortBy => {
    this.setState({ sortBy });
  };
  handleSearchChange = search => {
    this.setState({ search });
    this.handleSearchDeboucedChange(search);
  };
  handleSearchDeboucedChange = _.debounce(searchDebouced => {
    this.setState({ searchDebouced });
  }, 500);
  handleFacetChange = facetId => state => {
    const { facets: facetsState } = this.state;
    this.setState({
      facets: { ...facetsState, [facetId]: state },
    });
  };
  render() {
    const { ensgId, symbol } = this.props;
    const { search, searchDebouced, sortBy, facets: facetsState } = this.state;
    const facetsInput = facets
      .map(f => ({ ...f, input: f.stateToInput(facetsState[f.id]) }))
      .filter(f => f.input)
      .reduce((acc, f) => {
        acc[f.id] = f.input;
        return acc;
      }, {});
    return (
      <Query
        query={associationsQuery}
        variables={{
          ensgId,
          sortBy,
          search: searchDebouced ? searchDebouced : null,
          facets: facetsInput,
        }}
      >
        {({ loading, error, data }) => {
          if (error) {
            return null;
          }

          let edges;
          let totalCount;
          let facetsData;
          if (
            loading &&
            !(data && data.target && data.target.diseasesConnection)
          ) {
            edges = [];
          } else {
            edges = data.target.diseasesConnection.edges;
            totalCount = data.target.diseasesConnection.totalCount;
            facetsData = data.target.diseasesConnection.facets;
          }

          const rows = edges.map(({ node, ...rest }) => ({
            disease: node,
            ...rest,
          }));
          const dataTypes =
            rows.length > 0
              ? rows[0].scoresByDataType.map(d => d.dataTypeId)
              : [];
          return (
            <Grid style={{ marginTop: '8px' }} container spacing={16}>
              <Grid item xs={12} md={3}>
                <Card elevation={0}>
                  <CardHeader title="Filter by" />
                  <CardContent>
                    {facetsData
                      ? facets.map(f => (
                          <f.FacetComponent
                            key={f.id}
                            state={facetsState[f.id]}
                            data={facetsData[f.id]}
                            onFacetChange={this.handleFacetChange(f.id)}
                          />
                        ))
                      : null}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={9}>
                <Card elevation={0}>
                  <CardHeader
                    title={
                      <React.Fragment>
                        <strong>{commaSeparate(totalCount)} diseases</strong>{' '}
                        associated with <strong>{symbol}</strong>
                      </React.Fragment>
                    }
                  />
                  <CardContent>
                    <TextField
                      id="associations-search"
                      label="Search"
                      value={search}
                      onChange={event =>
                        this.handleSearchChange(event.target.value)
                      }
                    />
                    <ClassicAssociationsTable
                      rows={rows}
                      dataTypes={dataTypes}
                      sortBy={sortBy}
                      onSortByChange={this.handleSortByChange}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default ClassicAssociations;
