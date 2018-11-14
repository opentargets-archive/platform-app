import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const KnownDrugsWidget = ({ symbol }) => {
  return (
    <Grid item>
      <Card>
        <CardHeader title="Know drugs" />
        <CardContent>
          <Typography variant="h4">43</Typography>
          <Typography>
            number of drugs associated with {symbol} with these modalities:
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default KnownDrugsWidget;
