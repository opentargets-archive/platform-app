import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import ClassicAssociationsTable from './ClassicAssociationsTable';

function ClassicAssociations({ efoId, name }) {
  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          <strong>XYZ targets</strong> associated with <strong>{name}</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <Card elevation={0} style={{ overflow: 'visible' }}>
          <CardContent>
            <ClassicAssociationsTable efoId={efoId} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ClassicAssociations;
