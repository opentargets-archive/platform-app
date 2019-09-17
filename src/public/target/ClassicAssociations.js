import React from 'react';
import _ from 'lodash';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { Tabs, Tab, commaSeparate } from 'ot-ui';

import * as facetsObject from './facetIndex';
import ClassicAssociationsDAG from './ClassicAssociationsDAG';
import ClassicAssociationsBubbles from './ClassicAssociationsBubbles';
import ClassicAssociationsTable from './ClassicAssociationsTable';
import FacetContainer from '../common/FacetContainer';

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
    efo {
      nodes {
        id
        name
        parentIds 
      }
      therapeuticAreas
    }
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
    page: 0,
    pageCursors: {},
    facets: facetsStateDefault,
    search: '',
    searchDebouced: '',
    sortBy: { field: 'SCORE_OVERALL', ascending: false },
    tab: 'table',
  };
  handlePaginationChange = (forward, nextPageCursor) => {
    const { page, pageCursors } = this.state;
    if (forward) {
      // go to next page
      this.setState({
        page: page + 1,
        pageCursors: { ...pageCursors, [page + 1]: nextPageCursor },
      });
    } else {
      // go to previous page
      this.setState({ page: page - 1 });
    }
  };
  handleSortByChange = sortBy => {
    this.setState({ sortBy, page: 0 });
  };
  handleSearchChange = search => {
    this.setState({ search });
    this.handleSearchDeboucedChange(search);
  };
  handleSearchDeboucedChange = _.debounce(searchDebouced => {
    this.setState({ searchDebouced, page: 0 });
  }, 500);
  handleFacetChange = facetId => state => {
    const { facets: facetsState } = this.state;
    this.setState({
      facets: { ...facetsState, [facetId]: state },
      page: 0,
    });
  };
  handleTabChange = (event, tab) => {
    this.setState({ tab });
  };
  render() {
    const { ensgId, symbol } = this.props;
    const {
      search,
      searchDebouced,
      sortBy,
      facets: facetsState,
      page,
      pageCursors,
      first: rowsPerPage,
      tab,
    } = this.state;
    const facetsInput = facets
      .map(f => ({ ...f, input: f.stateToInput(facetsState[f.id]) }))
      .filter(f => f.input)
      .reduce((acc, f) => {
        acc[f.id] = f.input;
        return acc;
      }, {});
    const after = page > 0 ? pageCursors[page] : null;
    return (
      <Query
        query={associationsQuery}
        variables={{
          ensgId,
          sortBy,
          search: searchDebouced ? searchDebouced : null,
          facets: facetsInput,
          after,
        }}
      >
        {({ loading, error, data }) => {
          if (error) {
            return null;
          }

          let edges;
          let totalCount;
          let facetsData;
          let pageInfo;
          let efo;
          if (
            loading &&
            !(data && data.efo && data.target && data.target.diseasesConnection)
          ) {
            edges = [];
            efo = { nodes: [], therapeuticAreas: [] };
          } else {
            edges = data.target.diseasesConnection.edges;
            totalCount = data.target.diseasesConnection.totalCount;
            facetsData = data.target.diseasesConnection.facets;
            pageInfo = data.target.diseasesConnection.pageInfo;
            efo = data.efo;
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
              <Grid item xs={12}>
                <Typography variant="h6">
                  <strong>{commaSeparate(totalCount)} diseases</strong>{' '}
                  associated with <strong>{symbol}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card elevation={0}>
                  <CardContent>
                    <Typography variant="h6">Filter by</Typography>
                    <div style={{ paddingTop: '8px', paddingBottom: '4px' }}>
                      <TextField
                        id="associations-search"
                        label="Disease Name"
                        value={search}
                        onChange={event =>
                          this.handleSearchChange(event.target.value)
                        }
                        fullWidth
                        variant="outlined"
                      />
                    </div>
                    {facetsData
                      ? facets.map(f => (
                          <FacetContainer key={f.id} name={f.name}>
                            <f.FacetComponent
                              state={facetsState[f.id]}
                              data={facetsData[f.id]}
                              onFacetChange={this.handleFacetChange(f.id)}
                            />
                          </FacetContainer>
                        ))
                      : null}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={9}>
                <Tabs
                  value={tab}
                  onChange={this.handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab value="table" label="Table" />
                  <Tab value="bubbles" label="Bubbles" />
                  <Tab value="dag" label="Graph" />
                </Tabs>
                <Card elevation={0}>
                  <CardContent>
                    {/* table view */}
                    {tab === 'table' && (
                      <ClassicAssociationsTable
                        rows={rows}
                        dataTypes={dataTypes}
                        sortBy={sortBy}
                        onSortByChange={this.handleSortByChange}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        totalCount={totalCount}
                        pageInfo={pageInfo}
                        onPaginationChange={this.handlePaginationChange}
                      />
                    )}

                    {/* bubbles view */}
                    {tab === 'bubbles' && (
                      <ClassicAssociationsBubbles
                        rows={rows}
                        dataTypes={dataTypes}
                        sortBy={sortBy}
                        onSortByChange={this.handleSortByChange}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        totalCount={totalCount}
                        pageInfo={pageInfo}
                        onPaginationChange={this.handlePaginationChange}
                      />
                    )}

                    {/* dag view */}
                    {tab === 'dag' && (
                      <ClassicAssociationsDAG
                        data={rows}
                        efo={efo}
                        dataTypes={dataTypes}
                        sortBy={sortBy}
                        onSortByChange={this.handleSortByChange}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        totalCount={totalCount}
                        pageInfo={pageInfo}
                        onPaginationChange={this.handlePaginationChange}
                      />
                    )}
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
