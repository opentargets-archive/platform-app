import React from 'react';
import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';

import ClassicAssociationsTable from './ClassicAssociationsTable';

function ClassicAssociations({ ensgId, symbol }) {
  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      {/* <Grid item xs={12}>
        <Typography variant="h6">
          <strong>XYZ diseases</strong> associated with{' '}
          <strong>{symbol}</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <Card elevation={0} style={{ overflow: 'visible' }}>
          <CardContent> */}
      <ClassicAssociationsTable ensgId={ensgId} symbol={symbol} />
      {/* </CardContent>
        </Card>
      </Grid> */}
    </Grid>
  );
}

export default ClassicAssociations;
