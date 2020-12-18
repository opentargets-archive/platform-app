import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';

import Link from '../../components/Link';
import OTLogo from '../../assets/OTLogo';

const useStyles = makeStyles(theme => ({
  homeboxContainer: {
    overflow: 'visible',
    padding: '30px 60px',
  },
  homeboxHeader: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    color: theme.palette.grey[700],
    bottom: '40px',
    fontSize: '30px',
    marginLeft: '7px',
    position: 'relative',
  },
  logo: {
    maxWidth: '30rem',
    width: '100%',
  },
  note: {
    backgroundColor: '#ffffcc',
    textAlign: 'center',
    padding: '15px 74px',
  },
  important: {
    marginBottom: '10px',
  },
}));

const HomeBox = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={8} md={8} lg={8}>
      <Paper className={classes.homeboxContainer}>
        <div className={classes.homeboxHeader}>
          <OTLogo className={classes.logo} />
        </div>
        {children}
      </Paper>
      <Grid
        container
        direction="column"
        className={classes.note}
        alignItems="center"
      >
        <Grid item className={classes.important}>
          <strong> **Important Note** </strong>
        </Grid>
        <Grid item>
          This is the <strong>Beta</strong> version of the redesigned{' '}
          <Link to="https://www.targetvalidation.org" external>
            Open Targets Platform
          </Link>
          .
        </Grid>
        <Grid item>
          You can search for and view target, disease, and drug profile pages.
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeBox;
