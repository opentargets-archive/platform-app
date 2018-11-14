import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const PathwaysWidget = ({ symbol }) => {
  return (
    <Grid item>
      <Card>
        <CardHeader title="Pathways" />
        <CardContent>
          <Typography variant="h4">14</Typography>
          <Typography>
            number of biological pathways involving {symbol}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PathwaysWidget;
