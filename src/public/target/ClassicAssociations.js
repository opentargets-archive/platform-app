import React from 'react';
import { useQuery } from '@apollo/client';
import _ from 'lodash';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { client3 } from './../client';
import ClassicAssociationsTable from './ClassicAssociationsTable';

const DATA_TYPES_QUERY = gql`
  query DataTypesQuery {
    associationDatasources {
      datasource
      datatype
    }
  }
`;

function ClassicAssociations({ ensgId, symbol }) {
  const { loading, error, data } = useQuery(DATA_TYPES_QUERY, {
    variables: {},
    client: client3,
  });

  if (loading || error) return null;

  const dataTypes = _.uniq(data.associationDatasources.map(ds => ds.datatype));

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          <strong>XYZ diseases</strong> associated with{' '}
          <strong>{symbol}</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <Card elevation={0}>
          <CardContent>
            <ClassicAssociationsTable ensgId={ensgId} dataTypes={dataTypes} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ClassicAssociations;
