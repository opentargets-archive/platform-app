import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const CancerBiomarkersWidget = ({ symbol }) => {
  return (
    <Grid item md={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center">
            Cancer biomarkers
          </Typography>
          <Typography variant="h4" align="center">
            10
          </Typography>
          <Typography>
            number of biomarkers associated with 1 disease
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CancerBiomarkersWidget;
