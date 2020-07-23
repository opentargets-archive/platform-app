import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { Link, NavBar, Footer } from 'ot-ui';

import Splash from './Splash';
// import Stats from './Stats';
import HomeBox from './HomeBox';
import searchExamples from './searchExamples';
import Search from '../../components/Search';
import { externalLinks, mainMenuItems } from '../../constants';

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
            <Link to={`/target/${targets[0].id}`}>{targets[0].label}</Link>
            <Link to={`/target/${targets[1].id}`}>{targets[1].label}</Link>
            <Link to={`/disease/${diseases[0].id}`}>{diseases[0].label}</Link>
            <Link to={`/disease/${diseases[1].id}`}>{diseases[1].label}</Link>
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
              to="http://platform-api-alpha.opentargets.io/api/v4/graphql/browser"
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
