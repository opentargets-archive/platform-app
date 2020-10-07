import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import { Skeleton } from '@material-ui/lab';

import ClassicAssociationsTable from './ClassicAssociationsTable';
import { Facets } from '../../components/Facets';
import useBatchDownloader from '../../hooks/useBatchDownloader';

const DISEASE_ASSOCIATIONS_QUERY = gql`
  query DiseaseAssociationsQuery(
    $efoId: String!
    $index: Int!
    $size: Int!
    $BFilter: String
    $orderByScore: String!
    $aggregationFilters: [AggregationFilter!]
  ) {
    disease(efoId: $efoId) {
      id
      name
      associatedTargets(
        page: { index: $index, size: $size }
        orderByScore: $orderByScore
        BFilter: $BFilter
        aggregationFilters: $aggregationFilters
      ) {
        count

        # Associations (actual data)
        rows {
          target {
            id
            approvedSymbol
            approvedName
          }
          score
          datatypeScores {
            componentId: id
            score
          }
        }

        # Aggregations (facet tree)
        aggregations {
          uniques
          aggs {
            name
            uniques
            rows {
              key
              uniques
              aggs {
                key
                uniques
              }
            }
          }
        }
      }
    }
  }
`;

function ClassicAssociations({ efoId }) {
  const [aggregationFilters, setAggregationFilters] = useState([]);
  const [filter, setFilter] = useState(null);
  const [sortBy, setSortBy] = useState('score');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const { loading, data } = useQuery(DISEASE_ASSOCIATIONS_QUERY, {
    variables: {
      efoId,
      index: page,
      size: pageSize,
      BFilter: filter,
      orderByScore: sortBy,
      aggregationFilters,
    },
  });

  const handleAggregationFiltersChange = newFilters => {
    setAggregationFilters(newFilters);
    setPage(0);
  };

  const handlePageChange = page => {
    setPage(page);
  };

  const handlePageSizeChange = pageSize => {
    setPageSize(pageSize);
    setPage(0);
  };

  const handleSortByChange = sortBy => {
    setSortBy(sortBy);
  };

  const handleFilterChange = filter => {
    setFilter(filter);
    setPage(0);
  };

  const handleGetAllAssociations = useBatchDownloader(
    DISEASE_ASSOCIATIONS_QUERY,
    { efoId, filter, sortBy },
    'data.disease.associatedTargets'
  );

  const facetData = data?.disease?.associatedTargets.aggregations.aggs;

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {data ? (
            <>
              <strong>{data.disease.associatedTargets.count} targets</strong>{' '}
              associated with <strong>{data.disease.name}</strong>
            </>
          ) : (
            <strong>Loading...</strong>
          )}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Card elevation={0}>
          <CardContent>
            <Facets
              loading={loading}
              data={facetData}
              onChange={handleAggregationFiltersChange}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Card elevation={0} style={{ overflow: 'visible' }}>
          <CardContent>
            {loading && !data ? (
              <Skeleton variant="rect" height="40vh" />
            ) : (
              <ClassicAssociationsTable
                efoId={efoId}
                data={data}
                sortBy={sortBy}
                page={page}
                pageSize={pageSize}
                onChangeFilter={handleFilterChange}
                onChangeSortBy={handleSortByChange}
                onChangePage={handlePageChange}
                onChangePageSize={handlePageSizeChange}
                onGetAllAssociations={handleGetAllAssociations}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ClassicAssociations;
