import React from 'react';
import { Grid, makeStyles, Typography, Hidden, Box } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { appTitle, externalLinks, mainMenuItems } from '../../constants';
import Footer from '../../components/Footer';
import HomeBox from './HomeBox';
import Link from '../../components/Link';
import NavBar from '../../components/NavBar';
import Search from '../../components/Search';
import searchExamples from './searchExamples';
import Splash from './Splash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faChevronDown,
  faDownload,
  faLaptopCode,
  faQuestionCircle,
  faFileAlt,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
  links: {
    marginTop: '12px',
  },
  api: {
    marginTop: '38px',
  },
  helpBoxes: {
    maxWidth: '150px',
    textAlign: 'center',
  },
  hpSection: {
    marginBottom: '40px',
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

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, left: 0, behavior: 'smooth' });
  };

  const HelpBoxIcon = ({ fai }) => {
    return (
      <div className="fa-layers fa-fw fa-6x">
        <FontAwesomeIcon icon={faCircle} />
        <FontAwesomeIcon icon={fai} transform="shrink-8" inverse />
      </div>
    );
  };

  return (
    <>
      <Helmet title={appTitle} />
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.hpSection}
      >
        <Splash />
        <NavBar
          name="platform"
          homepage
          items={mainMenuItems}
          placement="bottom-end"
        />
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

          {/* Links to API */}
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

        {/* scroll down button */}
        <Grid container justify="center">
          <div
            className="fa-layers fa-fw fa-3x"
            style={{
              height: '0px',
              marginTop: '-1em',
              filter: 'drop-shadow( 1px 1px 2px rgba(0, 0, 0, .5))',
              cursor: 'pointer',
            }}
            onClick={handleScrollDown}
          >
            <FontAwesomeIcon icon={faCircle} inverse />
            <FontAwesomeIcon icon={faChevronDown} transform="shrink-4" />
          </div>
        </Grid>
      </Grid>

      {/* About */}
      <Grid container justify="center" className={classes.hpSection}>
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
            By integrating publicly available datasets along with data generated
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

      {/* Get started */}
      <Grid container justify="center" className={classes.hpSection}>
        <Grid item xs={10} md={8}>
          <Typography variant="h4" component="h1" align="center" paragraph>
            Get started with the Platform
          </Typography>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={4}
            wrap="nowrap"
          >
            <Grid item>
              <Box className={classes.helpBoxes}>
                <Link to="/downloads/data">
                  <HelpBoxIcon fai={faDownload} />
                  <Typography align="center">
                    Download all of our datasets
                  </Typography>
                </Link>
              </Box>
            </Grid>

            <Grid item>
              <Box className={classes.helpBoxes}>
                <Link
                  to="https://platform-docs.opentargets.org/data-access/graphql-api"
                  external
                >
                  <HelpBoxIcon fai={faLaptopCode} />
                  <Typography align="center">
                    Access data with our GraphQL API
                  </Typography>
                </Link>
              </Box>
            </Grid>

            <Grid item>
              <Box className={classes.helpBoxes}>
                <Link to="https://platform-docs.opentargets.org/" external>
                  <HelpBoxIcon fai={faQuestionCircle} />
                  <Typography align="center">
                    Check out our Platform documentation
                  </Typography>
                </Link>
              </Box>
            </Grid>

            <Grid item>
              <Box className={classes.helpBoxes}>
                <Link
                  to="https://platform-docs.opentargets.org/citation"
                  external
                >
                  <HelpBoxIcon fai={faFileAlt} />
                  <Typography align="center">
                    Read our latest Platform publications
                  </Typography>
                </Link>
              </Box>
            </Grid>

            <Grid item>
              <Box className={classes.helpBoxes}>
                <Link to="https://community.opentargets.org/" external>
                  <HelpBoxIcon fai={faCommentDots} />
                  <Typography align="center">
                    Join the Open Targets Community
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* remove for integration day  */}
      {/* <Stats /> */}
      <Footer externalLinks={externalLinks} />
    </>
  );
};

export default HomePage;
