import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { client3 } from '../../client';
import ClassicAssociationsTable from './ClassicAssociationsTable';

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
  const { data } = useQuery(ASSOCIATIONS_COUNT_QUERY, {
    variables: {
      ensemblId: ensgId,
    },
    client: client3,
  });

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
        <Card elevation={0} style={{ overflow: 'visible' }}>
          <CardContent>
            <ClassicAssociationsTable ensgId={ensgId} symbol={symbol} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ClassicAssociations;
