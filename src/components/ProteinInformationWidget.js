import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const ProteinInformationWidget = () => {
  return (
    <Grid item>
      <Card>
        <CardHeader title="Protein information" />
        <CardContent>
          <Grid container>
            <Grid item>
              <Typography>
                Protvista sequence visualization available
              </Typography>
            </Grid>
            <Grid item>
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
