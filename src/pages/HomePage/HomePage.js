import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { appTitle, externalLinks, mainMenuItems } from '../../constants';
import Footer from '../../components/Footer';
import HomeBox from './HomeBox';
import Link from '../../components/Link';
import NavBar from '../../components/NavBar';
import Search from '../../components/Search';
import searchExamples from './searchExamples';
import Splash from './Splash';

const useStyles = makeStyles({
  links: {
    marginTop: '12px',
  },
  api: {
    marginTop: '38px',
  },
});

function pickTwo(arr) {
  let i1 = Math.floor(Math.random() * arr.length);
  let i2 = Math.floor(Math.random() * arr.length);

  while (i1 === i2) {
    i2 = Math.floor(Math.random() * arr.length);
  }

  return [arr[i1], arr[i2]];
}

const HomePage = () => {
  const classes = useStyles();
  const targets = pickTwo(searchExamples.targets);
  const diseases = pickTwo(searchExamples.diseases);
  const drugs = pickTwo(searchExamples.drugs);

  return (
    <>
      <Helmet title={appTitle} />
      <Grid container justify="center" alignItems="center">
        <Splash />
        <NavBar
          name="platform"
          homepage
          items={mainMenuItems}
          placement="bottom-end"
        />
        <HomeBox>
          <Search autoFocus />
          <Grid className={classes.links} container justify="space-around">
            <Link to={`/target/${targets[0].id}/associations`}>
              {targets[0].label}
            </Link>
            <Link to={`/target/${targets[1].id}/associations`}>
              {targets[1].label}
            </Link>
            <Link to={`/disease/${diseases[0].id}/associations`}>
              {diseases[0].label}
            </Link>
            <Link to={`/disease/${diseases[1].id}/associations`}>
              {diseases[1].label}
            </Link>
            <Link to={`/drug/${drugs[0].id}`}>{drugs[0].label}</Link>
            <Link to={`/drug/${drugs[1].id}`}>{drugs[1].label}</Link>
          </Grid>
          <Grid
            className={classes.api}
            container
            alignItems="center"
            direction="column"
          >
            <div>Looking to access our data?</div>
            <Link
              to="http://platform-api-beta.opentargets.io/api/v4/graphql/browser"
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
