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

const ChemicalProbesWidget = ({ symbol, classes }) => {
  return (
    <Grid item md={3}>
      <Card className={classes.widget}>
        <CardContent>
          <Typography variant="h5" align="center">
            Chemical probes
          </Typography>
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

export default withStyles(styles)(ChemicalProbesWidget);
