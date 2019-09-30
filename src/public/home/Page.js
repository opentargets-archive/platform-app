import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import 'particles.js';

import { Link } from 'ot-ui';

import { particlesConfig } from '../../constants';

const styles = theme => ({
  splash: {
    backgroundColor: theme.palette.primary.main,
  },
});

class HomePage extends Component {
  componentDidMount() {
    window.particlesJS('splash', particlesConfig, function() {
      console.log('particles.js config loaded');
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div id="splash" className={classes.splash}></div>
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
          <Link to="/evidence/ENSG00000091831/EFO_0000305">Evidence page</Link>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(HomePage);
