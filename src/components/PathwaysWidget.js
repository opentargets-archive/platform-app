import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const PathwaysWidget = ({ symbol }) => {
  return (
    <Grid item md={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center">
            Pathways
          </Typography>
          <Typography variant="h4" align="center">
            14
          </Typography>
          <Typography>
            number of biological pathways involving {symbol}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PathwaysWidget;
