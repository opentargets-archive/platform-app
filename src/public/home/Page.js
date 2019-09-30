import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'particles.js';

import { Link, HomeBox, NavBar, Footer } from 'ot-ui';

import { externalLinks } from '../../constants';
import Splash from './Splash';

const HomePage = () => (
  <Fragment>
    <Grid container justify="center" alignItems="center">
      <Splash />
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
          <Link to="/evidence/ENSG00000091831/EFO_0000305">Evidence page</Link>
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

export default HomePage;
