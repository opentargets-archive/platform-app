import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';

import { Link, HomeBox, NavBar, Footer } from 'ot-ui';

import Splash from './Splash';
import { externalLinks } from '../../constants';

const HomePage = () => {
  return (
    <Fragment>
      <Grid container justify="center" alignItems="center">
        <Splash />
        <NavBar name="platform" homepage />
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
      <Footer externalLinks={externalLinks} />
    </Fragment>
  );
};

export default HomePage;
