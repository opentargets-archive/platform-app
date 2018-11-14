import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const SimilarTargetsWidget = ({ symbol }) => {
  return (
    <Grid item>
      <Card>
        <CardHeader title="Similar targets" />
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

export default SimilarTargetsWidget;
