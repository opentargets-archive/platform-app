import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import { client3 } from '../../client';
import ClassicAssociationsTable from './ClassicAssociationsTable';
import ClassicAssociationsBubbles from './ClassicAssociationsBubbles';
import ClassicAssociationsDAG from './ClassicAssociationsDAG';
import { Facets } from '../../components/Facets';

const ASSOCIATIONS_COUNT_QUERY = gql`
  query TargetAssociationsQuery(
    $ensemblId: String!
    $aggregationFilters: [AggregationFilter!]
  ) {
    target(ensemblId: $ensemblId) {
      associatedDiseases(aggregationFilters: $aggregationFilters) {
        count
      }
    }
  }
`;

function ClassicAssociations({ ensgId, symbol }) {
  const [tab, setTab] = useState('heatmap');
  const [aggregationFilters, setAggregationFilters] = useState([]);
  const [getAssociations, { data }] = useLazyQuery(ASSOCIATIONS_COUNT_QUERY, {
    variables: {
      ensemblId: ensgId,
      aggregationFilters,
    },
    client: client3,
  });

  useEffect(
    () => {
      getAssociations(aggregationFilters);
    },
    [aggregationFilters, getAssociations]
  );

  const handleTabChange = (_, tab) => {
    setTab(tab);
  };

  const handleChangeFilters = newFilters => setAggregationFilters(newFilters);

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {data ? (
            <strong>{data.target.associatedDiseases.count}</strong>
          ) : null}
          <strong> diseases</strong> associated with <strong>{symbol}</strong>
        </Typography>
      </Grid>{' '}
      <Grid item xs={12} md={3}>
        <Card elevation={0}>
          <CardContent>
            <Facets
              entity="target"
              id={ensgId}
              onChange={handleChangeFilters}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={9}>
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
            {tab === 'heatmap' && (
              <ClassicAssociationsTable
                ensgId={ensgId}
                symbol={symbol}
                aggregationFilters={aggregationFilters}
              />
            )}
            {tab === 'bubbles' && (
              <ClassicAssociationsBubbles ensgId={ensgId} symbol={symbol} />
            )}
            {tab === 'dag' && (
              <ClassicAssociationsDAG ensgId={ensgId} symbol={symbol} />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ClassicAssociations;
