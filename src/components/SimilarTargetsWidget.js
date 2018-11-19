import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const SimilarTargetsWidget = ({ symbol }) => {
  return (
    <Grid item md={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center">
            Similar targets
          </Typography>
          <Typography variant="h4" align="center">
            14
          </Typography>
          <Typography>number of targets related to {symbol}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SimilarTargetsWidget;
