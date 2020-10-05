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
import { client3 } from '../../client';
import { Facets } from '../../components/Facets';
import Wrapper from './Wrapper';

const TARGET_ASSOCIATIONS_QUERY = gql`
  query TargetAssociationsQuery(
    $ensemblId: String!
    $aggregationFilters: [AggregationFilter!]
  ) {
    target(ensemblId: $ensemblId) {
      approvedName
      associatedDiseases(aggregationFilters: $aggregationFilters) {
        count
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
  const { loading, data, refetch } = useQuery(TARGET_ASSOCIATIONS_QUERY, {
    variables: { ensemblId: ensgId, aggregationFilters },
    client: client3,
  });

  const handleTabChange = (_, tab) => {
    setTab(tab);
  };

  const handleChangeFilters = newFilters => {
    setAggregationFilters(newFilters);
    refetch();
  };

  const facetData = data?.target?.associatedDiseases.aggregations.aggs;

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {data ? (
            <>
              <strong>{data.target.associatedDiseases.count} diseases</strong>{' '}
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
              onChange={handleChangeFilters}
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
                    aggregationFilters={aggregationFilters}
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
