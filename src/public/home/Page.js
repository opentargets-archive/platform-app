import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';

import { Link, HomeBox, NavBar, Footer } from 'ot-ui';

import Splash from './Splash';
import Search from '../common/search/Search';
import { externalLinks } from '../../constants';

console.log('Homepage Search', Search);

const HomePage = () => {
  return (
    <Fragment>
      <Grid container justify="center" alignItems="center">
        <Splash />
        <NavBar name="platform" homepage />
        <HomeBox name="Platform">
          <Search />
          <Grid container justify="space-around" style={{ marginTop: '12px' }}>
            <Link to="/target/ENSG00000091831">ESR1</Link>
            <Link to="/disease/EFO_0000384">Crohn's disease</Link>
            <Link to="/drug/CHEMBL2111100">MIFAMURTIDE</Link>
            <Link to="/evidence/ENSG00000091831/EFO_0000305">
              Evidence page
            </Link>
          </Grid>
        </HomeBox>
      </Grid>
      <Footer externalLinks={externalLinks} />
    </Fragment>
  );
};

export default HomePage;
