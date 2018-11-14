import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { NavBar, Footer } from 'ot-ui';

import { externalLinks } from '../constants';

const BasePage = ({ children }) => {
  return (
    <Fragment>
      <NavBar name="Platform" />
      <Grid container justify="space-around">
        <Grid item md={10}>
          {children}
        </Grid>
      </Grid>
      <Footer externalLinks={externalLinks} />
    </Fragment>
  );
};

export default BasePage;
