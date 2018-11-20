import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
  bold: {
    fontWeight: 'bold',
  },
});

const SimilarTargetsWidget = ({ symbol, classes, similarTargets }) => {
  return (
    <Grid item md={3}>
      <Card className={classes.widget}>
        <CardContent>
          <Typography variant="h5" align="center">
            Similar targets
          </Typography>
          <Typography variant="h4" align="center">
            {similarTargets.count}
          </Typography>
          <Typography align="center">
            number of targets related to {symbol}
          </Typography>
          <Typography variant="caption" align="center">
            average of{' '}
            <span className={classes.bold}>
              {similarTargets.averageCommonDiseases}
            </span>{' '}
            common associated diseases
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(SimilarTargetsWidget);
