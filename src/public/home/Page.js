import React from 'react';
import Grid from '@material-ui/core/Grid';

import { Link, HomeBox, NavBar, Footer } from 'ot-ui';

import Splash from './Splash';
import Stats from './Stats';
import Search from '../common/search/Search';
import { externalLinks, mainMenuItems } from '../../constants';

const HomePage = () => {
  return (
    <>
      <Grid container justify="center" alignItems="center">
        <Splash />
        <NavBar
          name="platform"
          homepage
          items={mainMenuItems}
          placement="bottom-end"
        />
        <HomeBox name="Platform">
          <Search autoFocus />
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
      <Stats />
      <Footer externalLinks={externalLinks} />
    </>
  );
};

export default HomePage;
