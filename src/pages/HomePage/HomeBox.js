import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';

import OTLogo from '../../assets/OTLogo';

const useStyles = makeStyles(theme => ({
  homeboxContainer: {
    overflow: 'visible',
    padding: '30px 60px',
    maxWidth: '800px',
    margin: 'auto',
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
    </Grid>
  );
};

export default HomeBox;
