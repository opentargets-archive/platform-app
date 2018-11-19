import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
});

const CancerBiomarkersWidget = ({ symbol, classes }) => {
  return (
    <Grid item md={3}>
      <Card className={classes.widget}>
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

export default withStyles(styles)(CancerBiomarkersWidget);
