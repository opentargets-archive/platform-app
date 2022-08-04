import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Paper,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import NCIFooter from '../../components/NCIFooter';
import NCIHeader from '../../components/NCIHeader';
import ScrollToTop from '../../components/ScrollToTop';
import Link from '../../components/Link';
import {
  appDescription,
  appCanonicalUrl,
  version
} from '../../constants';
import ExternalLinkIcon from '../../components/ExternalLinkIcon';
import usePlatformApi from '../../hooks/usePlatformApi';

const useStyles = makeStyles(theme => ({
  changeLogContainer: {
    minWidth: '340px',
    backgroundColor: '#EDF1F4',
    color: '#000000',
    fontSize: '16px',
    marginTop: theme.header.height,
    padding: `${theme.header.spacing} 40px 68px`,
    '@media (max-width: 360px)': {
      padding: `${theme.header.spacing} 28px 68px`,
    },
  },
  changeLogSubContainer: {
    padding:'55px 40px 0px 40px',
    '@media (max-width: 460px)': {
      padding:'30px 0px 0px 0px',
    }
  },
  changeLogPaper: {
    marginBottom: '8px',
    borderRadius: '8px',
  },
  changeLogBox:{
    display: 'flex', 
    border: '1px solid #2188D8', 
    borderRadius: '6px'
  },
  changeLogBoxLeft:{
    flex: 1, 
    padding: '12px 17px 17px 14px' 
  },
  changeLogBoxRight:{
    flex: 1,
    padding: '12px 17px 17px 14px',
    borderLeft: '1px solid #2188D8' 
  },
}));

const AboutView = ({ data }) => {
  const request = usePlatformApi()
  const classes = useStyles();
  const appTitle = "Change Log";
  const BEversion =
      request.loading ? "Loading..." : request.data?.meta?.mtpVersion?.version || version.backend

  return (
    <>
    <Helmet title={appTitle}>
      <meta name="description" content={appDescription} />
      <link rel="canonical" href={appCanonicalUrl} />
    </Helmet>
    <ScrollToTop/>
    <NCIHeader/>

    <Grid container justify="center" className={classes.changeLogContainer}>
      <Grid item xs={12} md={8} lg={7} xl={6} className={classes.introContainer}>

        <Typography variant="h4" component="h1" align="center" paragraph className={classes.title}>
          Change Log
        </Typography>

        <Typography paragraph>
          The Molecular Targets Platform integrates many different sources of data and analyses, all of which are updated 
          at varying intervals. In order to comprehensively track changes, the various changelogs are aggregated here.
        </Typography>
        
        <Grid item className={classes.changeLogSubContainer}>
          <Paper className={classes.changeLogPaper}>
            <div className={classes.changeLogBox}>
              <div className={classes.changeLogBoxLeft} >
              
                <Typography variant="h6" component="h1" paragraph className={classes.projectTitle}>
                  Open Targets Platform
                </Typography>

                <b>Version in use</b>: 21.06 (Released 2021-06-30) <br />
                <b>Detailed Change Log</b>: 
                <Link to="https://platform-docs.opentargets.org/release-notes" external>{' '} 
                  Open Targets Platform<ExternalLinkIcon />
                </Link>
              
              </div>
              <div className={classes.changeLogBoxRight}>
                The Open Targets Platform version represents the built-in data and functions of the Molecular Targets Platform. 
                This includes all data, displays, and site behavior not otherwise defined in this About page.
              </div>
            
            </div>
          </Paper>

           <Paper className={classes.changeLogPaper}>
            <div className={classes.changeLogBox}>
              <div className={classes.changeLogBoxLeft} >
                <Typography variant="h6" component="h1" paragraph className={classes.projectTitle}>
                  Molecular Targets Platform Frontend
                </Typography>
                <b>Version in use</b>: {version.frontend} <br />
                <b>Detailed Change Log</b>: 
                <Link to={version.frontendURL} external>{' '} 
                  MTP Frontend Release<ExternalLinkIcon />
                </Link>
              </div>

              <div className={classes.changeLogBoxRight}>
                The Molecular Targets Platform Frontend contains all of the visual and user-focused components of the site.
              </div>
            </div>
          </Paper>

           <Paper className={classes.changeLogPaper}>
            <div className={classes.changeLogBox}>
              <div className={classes.changeLogBoxLeft} >
                <Typography variant="h6" component="h1" paragraph className={classes.projectTitle}>
                  Molecular Targets Platform Backend
                </Typography>
                <b>Version in use</b>: {BEversion} <br />
                <b>Detailed Change Log</b>: 
                <Link to={version.backendURL} external>{' '} 
                  MTP Backend Release<ExternalLinkIcon />
                </Link>
              </div>

              <div className={classes.changeLogBoxRight}>
                The Molecular Targets Platform Backend contains all of the database and infrastructure components of the site. 
              </div>
            </div>
          </Paper>

           <Paper className={classes.changeLogPaper}>
            <div className={classes.changeLogBox}>
              <div className={classes.changeLogBoxLeft} >
                <Typography variant="h6" component="h1" paragraph className={classes.projectTitle}>
                  OpenPedCan Analyses
                </Typography>
                <b>Version in use</b>: v10 (Released 2021-10-12) <br />
                <b>Detailed Change Log</b>: 
                <Link to="https://github.com/PediatricOpenTargets/OpenPedCan-analysis/blob/4fb04fe60754b90da3c241dbb8b727c3722487cc/doc/release-notes.md" external>{' '} 
                  OpenPedCan Analysis Release<ExternalLinkIcon />
                </Link>
              </div>

              <div className={classes.changeLogBoxRight}>
                The OpenPedCan version represents new analysis results used in the OpenPedCan Somatic Alterations and Gene Expression displays.
              </div>
            </div>
          </Paper>

           <Paper className={classes.changeLogPaper}>
            <div className={classes.changeLogBox}>
              <div className={classes.changeLogBoxLeft} >
                <Typography variant="h6" component="h1" paragraph className={classes.projectTitle}>
                  OncoKB Cancer Gene List
                </Typography>
                <b>Version in use</b>: v3.5 (Released 2021-07-16) <br />
                <b>Detailed Change Log</b>: 
                <Link to="https://www.oncokb.org/news#07162021" external>{' '} 
                  OncoKB Release<ExternalLinkIcon />
                </Link>
              </div>

              <div className={classes.changeLogBoxRight}>
                The OncoKB Cancer Gene List version represents the genes identified as OncoKB oncogenes or tumor suppressor genes within the OpenPedCan Somatic Alterations display.
              </div>
            </div>
          </Paper>
        <Paper className={classes.changeLogPaper}>
            <div className={classes.changeLogBox}>
              <div className={classes.changeLogBoxLeft} >
                <Typography variant="h6" component="h1" paragraph className={classes.projectTitle}>
                  FDA Pediatric Molecular Target Lists
                </Typography>
                <b>Version in use</b>: v1.1 (Released 2021-09-09) <br />
                <b>Detailed Change Log</b>: 
                <Link to="/fda-pmtl-docs">{' '}
                  FDA PMTL Documentation
                </Link>
              </div>

              <div className={classes.changeLogBoxRight}>
                The FDA PMTL version represents the computable interpretation of the lists as used within the Molecular Targets Platform. 
                When the FDA publishes new lists, new computable interpretations will be updated here.
              </div>
            </div>
          </Paper>

        </Grid>
      </Grid>
    </Grid>
    <NCIFooter/>
    </>
  );
};

export default AboutView;
