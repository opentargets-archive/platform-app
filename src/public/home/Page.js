import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import 'particles.js';

import { Link, HomeBox, NavBar, Footer } from 'ot-ui';

import { externalLinks, particlesConfig } from '../../constants';

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

class HomePage extends Component {
  componentDidMount() {
    window.particlesJS('splash', particlesConfig);
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid container justify="center" alignItems="center">
          <div className={classes.splashContainer}>
            <div id="splash" className={classes.splash}></div>
          </div>
          <NavBar name="Platform" homepage />
          <HomeBox name="Platform">
            <div>Home</div>
            <div>
              <Link to="/target/ENSG00000091831">Target page</Link>
            </div>
            <div>
              <Link to="/disease/EFO_0000384">Disease page</Link>
            </div>
            <div>
              <Link to="/drug/CHEMBL2111100">Drug page</Link>
            </div>
            <div>
              <Link to="/evidence/ENSG00000091831/EFO_0000305">
                Evidence page
              </Link>
            </div>
          </HomeBox>
        </Grid>
        <Grid>
          <Typography align="center">
            Some text about the platform will go here
          </Typography>
        </Grid>
        <Footer externalLinks={externalLinks} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(HomePage);
