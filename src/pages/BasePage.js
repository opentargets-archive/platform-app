import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavBar, Footer } from 'ot-ui';

import { externalLinks } from '../constants';
import Search from '../components/Search';

const styles = theme => ({
  container: {
    padding: '40px 24px',
  },
});

const BasePage = ({ children, classes }) => {
  return (
    <Fragment>
      <Helmet
        defaultTitle="Open Targets Platform"
        titleTemplate="%s | Open Targets Platform"
      />
      <NavBar name="Platform" search={<Search searchLocation="navbar" />} />
      <Grid className={classes.container} container justify="space-around">
        <Grid item md={11}>
          {children}
        </Grid>
      </Grid>
      <Footer externalLinks={externalLinks} />
    </Fragment>
  );
};

export default withStyles(styles)(BasePage);
