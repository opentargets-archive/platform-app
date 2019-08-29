import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import ClassicAssociationsTable from './ClassicAssociationsTable';

const associationsQuery = gql`
  query TargetAssociationsQuery(
    $ensgId: String!
    $first: Int
    $after: String
    $facets: TargetDiseasesConnectionFacetsInput
  ) {
    target(ensgId: $ensgId) {
      id
      diseasesConnection(first: $first, after: $after, facets: $facets) {
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
            id
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
  };
  handlePaginationChange = () => {
    // TODO
  };
  handleSortByChange = () => {
    // TODO
  };
  handleSearchChange = () => {
    // TODO
  };
  handleFacetChange = () => {
    // TODO
  };
  render() {
    const { ensgId, symbol } = this.props;
    return (
      <Query query={associationsQuery} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }
          console.log(data);
          const { totalCount, edges } = data.target.diseasesConnection;
          const rows = edges.map(({ node, ...rest }) => ({
            disease: node,
            ...rest,
          }));
          const dataTypes =
            rows.length > 0 ? rows[0].scoresByDataType.map(d => d.id) : [];
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
                    <ClassicAssociationsTable
                      rows={rows}
                      dataTypes={dataTypes}
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
