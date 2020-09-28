import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
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
import Wrapper from './Wrapper';
import ClassicAssociationsBubbles from './ClassicAssociationsBubbles';
import ClassicAssociationsDAG from './ClassicAssociationsDAG';

const ASSOCIATIONS_COUNT_QUERY = gql`
  query TargetAssociationsQuery($ensemblId: String!) {
    target(ensemblId: $ensemblId) {
      associatedDiseases {
        count
      }
    }
  }
`;

function ClassicAssociations({ ensgId, symbol }) {
  const [tab, setTab] = useState('heatmap');
  const { data } = useQuery(ASSOCIATIONS_COUNT_QUERY, {
    variables: {
      ensemblId: ensgId,
    },
    client: client3,
  });

  function handleTabChange(_, tab) {
    setTab(tab);
  }

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {data ? (
            <strong>{data.target.associatedDiseases.count}</strong>
          ) : null}
          <strong> diseases</strong> associated with <strong>{symbol}</strong>
        </Typography>
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
              <ClassicAssociationsTable ensgId={ensgId} symbol={symbol} />
            )}
            {tab === 'bubbles' && (
              <Wrapper
                ensemblId={ensgId}
                symbol={symbol}
                Component={ClassicAssociationsBubbles}
              />
            )}
            {tab === 'dag' && (
              <Wrapper
                ensemblId={ensgId}
                symbol={symbol}
                Component={ClassicAssociationsDAG}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ClassicAssociations;
