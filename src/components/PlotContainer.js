import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

import PlotContainerSection from './PlotContainerSection';

const styles = () => ({
  plotContainer: {
    marginBottom: '15px',
  },
  leftContainer: {
    marginLeft: '4px',
  },
  rightContainer: {
    marginRight: '4px',
  },
});

const PlotContainer = ({
  classes,
  loading,
  error,
  left,
  center,
  right,
  children,
}) => (
  <Paper className={classes.plotContainer} elevation={0}>
    {left || center || right ? (
      <PlotContainerSection>
        <Grid container justifyContent="space-between" spacing={1}>
          <Grid item className={classes.leftContainer}>
            {left}
          </Grid>
          <Grid item>{center}</Grid>
          <Grid item className={classes.rightContainer}>
            {right}
          </Grid>
        </Grid>
      </PlotContainerSection>
    ) : null}
    {loading ? <LinearProgress /> : null}
    {error ? (
      <PlotContainerSection>
        <div align="center">
          <Typography variant="subtitle1" color="error">
            {error.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
            ))}
          </Typography>
        </div>
      </PlotContainerSection>
    ) : null}
    {children}
  </Paper>
);

export default withStyles(styles)(PlotContainer);
