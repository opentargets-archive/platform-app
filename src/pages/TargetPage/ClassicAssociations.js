import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import { Skeleton } from '@material-ui/lab';

import ClassicAssociationsDAG from './ClassicAssociationsDAG';
import ClassicAssociationsBubbles from './ClassicAssociationsBubbles';
import ClassicAssociationsTable from './ClassicAssociationsTable';
import { Facets } from '../../components/Facets';
import Wrapper from './Wrapper';
import useBatchDownloader from '../../hooks/useBatchDownloader';

const TARGET_ASSOCIATIONS_QUERY = gql`
  query TargetAssociationsQuery(
    $ensemblId: String!
    $index: Int!
    $size: Int!
    $BFilter: String
    $orderByScore: String!
    $aggregationFilters: [AggregationFilter!]
  ) {
    target(ensemblId: $ensemblId) {
      id
      approvedName
      associatedDiseases(
        page: { index: $index, size: $size }
        orderByScore: $orderByScore
        BFilter: $BFilter
        aggregationFilters: $aggregationFilters
      ) {
        count

        # Associations (actual data)
        rows {
          disease {
            id
            name
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

function ClassicAssociations({ ensgId, symbol }) {
  const [tab, setTab] = useState('heatmap');
  const [aggregationFilters, setAggregationFilters] = useState([]);
  const [filter, setFilter] = useState(null);
  const [sortBy, setSortBy] = useState('score');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const { loading, data } = useQuery(TARGET_ASSOCIATIONS_QUERY, {
    variables: {
      ensemblId: ensgId,
      index: page,
      size: pageSize,
      BFilter: filter,
      orderByScore: sortBy,
      aggregationFilters,
    },
  });

  const handleTabChange = (_, tab) => {
    setTab(tab);
  };

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
    TARGET_ASSOCIATIONS_QUERY,
    { ensemblId: ensgId, filter, sortBy },
    'data.target.associatedDiseases'
  );

  const facetData = data?.target?.associatedDiseases.aggregations.aggs;

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {data ? (
            <>
              <strong>
                {data.target.associatedDiseases.count} diseases or phenotypes
              </strong>{' '}
              associated with <strong>{symbol}</strong>
            </>
          ) : (
            <strong>Loading...</strong>
          )}
        </Typography>
      </Grid>{' '}
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
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="heatmap" label="Table" />
          <Tab value="bubbles" label="Bubbles" />
          <Tab value="dag" label="Graph" />
        </Tabs>
        <Card elevation={0} style={{ overflow: 'visible' }}>
          <CardContent>
            {loading && !data ? (
              <Skeleton variant="rect" height="40vh" />
            ) : (
              <>
                {tab === 'heatmap' && (
                  <ClassicAssociationsTable
                    ensgId={ensgId}
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
                {tab === 'bubbles' && (
                  <Wrapper
                    ensemblId={ensgId}
                    symbol={symbol}
                    Component={ClassicAssociationsBubbles}
                    aggregationFilters={aggregationFilters}
                  />
                )}
                {tab === 'dag' && (
                  <Wrapper
                    ensemblId={ensgId}
                    symbol={symbol}
                    Component={ClassicAssociationsDAG}
                    aggregationFilters={aggregationFilters}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ClassicAssociations;
