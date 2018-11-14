import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const ChemicalProbesWidget = ({ symbol }) => {
  return (
    <Grid item>
      <Card>
        <CardHeader title="Chemical probes" />
        <CardContent>
          <Typography variant="h4" align="center">
            1
          </Typography>
          <Typography>
            number of chemical probes developed for {symbol}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ChemicalProbesWidget;
