import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Hidden,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import NCIFooter from '../../components/NCIFooter';
import NCIHeader from '../../components/NCIHeader';
import HomeBox from './HomeBox';
import Link from '../../components/Link';
import Search from '../../components/Search';
import searchExamples from './searchExamples';
import Splash from './Splash';
import Version from './Version';
import {
  appTitle,
  appDescription,
  appCanonicalUrl,
} from '../../constants';
import externalIcon from '../../assets/about/About-ExternalLink.svg';


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
  externalIcon: {
    width: '15px',
  }
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
      <Helmet title={appTitle}>
        <meta name="description" content={appDescription} />
        <link rel="canonical" href={appCanonicalUrl} />
      </Helmet>
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
            The Molecular Targets Platform
          </Typography>

          <Typography paragraph align="center">
            The Molecular Targets Platform is an NCI-supported instance of the 
            <Link to={"https://platform.opentargets.org/"} external> Open Target Platform
            <img src={externalIcon} alt="redirct to public open targets" className={classes.externalIcon} /></Link> with a focus on
             preclinical pediatric oncology data. It is a tool that supports the identification and 
             prioritization of molecular targets expressed in childhood cancers. 
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
