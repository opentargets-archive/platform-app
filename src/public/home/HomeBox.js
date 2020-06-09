import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import otLogo from '../../icons/ot-logo.png';

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
    width: '322px',
  },
  name: {
    position: 'relative',
    bottom: '39px',
    left: '10px',
    fontWeight: '300',
    fontSize: '1.85rem',
  },
}));

const HomeBox = ({ name, children }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={8} md={8} lg={8}>
      <Paper className={classes.homeboxContainer}>
        <div className={classes.homeboxHeader}>
          <img className={classes.logo} src={otLogo} alt="Open Targets logo" />
          <span className={classes.name}>{name}</span>
        </div>
        {children}
      </Paper>
    </Grid>
  );
};

export default HomeBox;
