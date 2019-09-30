import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import 'particles.js';

import { particlesConfig } from '../../constants';

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

class Splash extends Component {
  componentDidMount() {
    window.particlesJS('splash', particlesConfig);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.splashContainer}>
        <div id="splash" className={classes.splash}></div>
      </div>
    );
  }
}

export default withStyles(styles)(Splash);
