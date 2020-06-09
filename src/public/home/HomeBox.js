// TODO: move this component to ot-ui package
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from 'ot-ui';

import OTLogo from '../../icons/OTLogo';

const useStyles = makeStyles(theme => ({
  homeboxContainer: {
    overflow: 'visible',
    padding: '30px 60px',
  },
  homeboxHeader: {
    textAlign: 'center',
  },
  title: {
    color: theme.palette.grey[700],
    bottom: '40px',
    fontSize: '30px',
    marginLeft: '7px',
    position: 'relative',
  },
  logo: {
    height: '6.2rem',
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
