import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Hidden,
} from '@material-ui/core';
import NCIFooter from '../../components/NCIFooter';
import NCIHeader from '../../components/NCIHeader';
import HomeBox from './HomeBox';
import Link from '../../components/Link';
import Search from '../../components/Search';
import searchExamples from './searchExamples';
import Splash from './Splash';
import Version from './Version';


const useStyles = makeStyles(theme => ({
  links: {
    marginTop: '12px',
  },
  api: {
    marginTop: '38px',
  },
  helpBoxes: {
    maxWidth: '120px',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  aboutBox:{
    margin: '70px 0',
  },
}));

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
      <NCIHeader/>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.homeBox}
      >
        <Splash />
        <HomeBox>
          <Search autoFocus />
          {/* Search examples */}
          <Grid className={classes.links} container justify="space-around">
            <Link to={`/target/${targets[0].id}/associations`}>
              {targets[0].label}
            </Link>
            <Hidden smDown>
              <Link to={`/target/${targets[1].id}/associations`}>
                {targets[1].label}
              </Link>
            </Hidden>

            <Link to={`/disease/${diseases[0].id}/associations`}>
              {diseases[0].label}
            </Link>
            <Hidden smDown>
              <Link to={`/disease/${diseases[1].id}/associations`}>
                {diseases[1].label}
              </Link>
            </Hidden>

            <Link to={`/drug/${drugs[0].id}`}>{drugs[0].label}</Link>
            <Hidden smDown>
              <Link to={`/drug/${drugs[1].id}`}>{drugs[1].label}</Link>
            </Hidden>
          </Grid>
          <Version />
        </HomeBox>
      </Grid>

      {/* About */}
      <Grid container justify="center" className={classes.aboutBox}>
        <Grid item xs={10} md={8}>
          <Typography variant="h4" component="h1" align="center" paragraph>
            About the Open Targets Platform
          </Typography>

          <Typography paragraph>
            The Open Targets Platform is a comprehensive tool that supports
            systematic identification and prioritisation of potential
            therapeutic drug targets.
          </Typography>

          <Typography paragraph>
            By integrating publicly available datasets including data generated
            by the Open Targets consortium, the Platform builds and scores
            target-disease associations to assist in drug target identification
            and prioritisation. It also integrates relevant annotation
            information about targets, diseases, phenotypes, and drugs, as well
            as their most relevant relationships.
          </Typography>

          <Typography paragraph>
            The Platform is a freely available resource that is actively
            maintained with bi-monthly data updates. Data is available through
            an intuitive user interface, an API, and data downloads. The
            pipeline and infrastructure codebases are open-source and the
            licence allows the creation of self-hosted private instances of the
            Platform with custom data.
          </Typography>
        </Grid>
      </Grid>

      {/* remove for integration day  */}
      {/* <Stats /> */}
      <NCIFooter/>
    </>
  );
};

export default HomePage;
