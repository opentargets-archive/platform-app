import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import NavIcon from '../../assets/PediatricDataCancer-MenuBar-Icon.svg'

const useStyles = makeStyles(theme => ({
  gridContainer: {
    padding: '0 28px',
  },
  homeboxContainer: {
    overflow: 'visible',
    padding: '30px 60px',
    maxWidth: '800px',
    margin: 'auto',
  },
  PCDNLink: {
    display: 'block',
    textDecoration: 'none',
  },
  PCDNContainer: {
    overflow: 'visible',
    maxWidth: '800px',
    minHeight: '52px',
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    background: 'linear-gradient(270deg, #0062B5 0%, #6DBC20 100%)',
    padding: '4px 0px',
    color: 'white',
    fontSize: '16px',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '10px',
  },
  navIconContainer: {
    display: 'inline-block',
    position: 'relative',
    top: '9px'
  },
  PCDNTextContainer: {
    position: 'relative',
    paddingLeft: '10px',
    top: '-1px',
  },
  PCDNText: {
    borderBottom: '1px solid white'
  },
  homeboxHeader: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    color: theme.palette.grey[700],
    fontSize: '28px',
    marginLeft: '7px',
    fontFamily: 'Montserrat',
    padding: '20px 10px',
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
  bolder: {
    fontWeight: '800',
  },
  thin: {
    fontWeight: '400',
  }
}));

const HomeBox = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.gridContainer}>
      <a href={"/pediatric-cancer-data-navigation"} className={classes.PCDNLink}>
        <div className={classes.PCDNContainer}> 
          <div className={classes.navIconContainer}>
            <img src={NavIcon} width="26px" height="27px" alt={"Navigation Icon"}/>
          </div>
          <span className={classes.PCDNTextContainer}>
            <span className={classes.PCDNText}>Explore our Pediatric Cancer Data</span>
          </span>
        </div>
      </a>
      <Paper className={classes.homeboxContainer}>
        <div className={classes.homeboxHeader}>
          <div className={classes.title}>
              <span className={classes.bolder}>Molecular Targets</span>
              <span className={classes.thin}> Platform</span>
            </div>
        </div>
        {children}
      </Paper>
    </Grid>
  );
};

export default HomeBox;
