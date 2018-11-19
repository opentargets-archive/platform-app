import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const ProteinInformationWidget = () => {
  return (
    <Grid item md={6}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center">
            Protein information
          </Typography>
          <Grid container>
            <Grid item md={6}>
              <Typography>
                Protvista sequence visualization available
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography>
                Subcellular location and subunit data available
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProteinInformationWidget;
