import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { Link, NavBar, Footer } from 'ot-ui';

import Splash from './Splash';
// import Stats from './Stats';
import HomeBox from './HomeBox';
import Search from '../common/search/Search';
import { externalLinks, mainMenuItems } from '../../constants';

const useStyles = makeStyles({
  links: {
    marginTop: '12px',
  },
  api: {
    marginTop: '38px',
  },
});

const HomePage = () => {
  const classes = useStyles();
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
          <Grid className={classes.links} container justify="space-around">
            <Link to="/target/ENSG00000091831">ESR1</Link>
            <Link to="/target/ENSG00000123374">ENSG00000123374</Link>
            <Link to="/disease/EFO_0000384">Crohn's disease</Link>
            <Link to="/disease/Orphanet_839">Orphanet_839</Link>
            <Link to="/disease/EFO_0003060">EFO_0003060</Link>
            <Link to="/drug/CHEMBL2111100">MIFAMURTIDE</Link>
            <Link to="/drug/CHEMBL1201580">Humira</Link>
          </Grid>
          <Grid
            className={classes.api}
            container
            alignItems="center"
            direction="column"
          >
            <div>Looking to access our data?</div>
            <Link
              to="https://api-beta-dot-open-targets-eu-dev.appspot.com"
              external
            >
              Browse our GraphQL API
            </Link>
          </Grid>
        </HomeBox>
      </Grid>
      {/* remove for integration day  */}
      {/* <Stats /> */}
      <Footer externalLinks={externalLinks} />
    </>
  );
};

export default HomePage;
