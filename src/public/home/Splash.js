import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  splashContainer: {
    height: '100vh',
  },
  splash: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

const Splash = ({ classes }) => {
  return (
    <div className={classes.splashContainer}>
      <div className={classes.splash} />
    </div>
  );
};

export default withStyles(styles)(Splash);
