import React from 'react';
import _ from 'lodash';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import ClassicAssociationsTable from './ClassicAssociationsTable';

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
      }
    }
  }
`;

class ClassicAssociations extends React.Component {
  state = {
    first: 50,
    after: null,
    page: 1,
    facets: null,
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
  handleFacetChange = () => {
    // TODO
  };
  render() {
    const { ensgId, symbol } = this.props;
    const { search, searchDebouced, sortBy } = this.state;
    return (
      <Query
        query={associationsQuery}
        variables={{
          ensgId,
          sortBy,
          search: searchDebouced ? searchDebouced : null,
        }}
      >
        {({ loading, error, data }) => {
          if (error) {
            return null;
          }

          let edges;
          if (loading) {
            edges = [];
          } else {
            edges = data.target.diseasesConnection.edges;
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
                  <CardHeader title="Filter by" subheader={'blah'} />
                  <CardContent></CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={9}>
                <Card elevation={0}>
                  <CardHeader title="Filter by" subheader={'blah'} />
                  <CardContent>
                    <TextField
                      id="associations-search"
                      label="Search"
                      value={search}
                      onChange={event =>
                        this.handleSearchChange(event.target.value)
                      }
                      margin="normal"
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
