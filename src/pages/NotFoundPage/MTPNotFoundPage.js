import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, Grid, Typography } from '@material-ui/core';

import NCIHeader from '../../components/NCIHeader';
import NCIFooter from '../../components/NCIFooter'
import { appTitle, appDescription, appCanonicalUrl } from '../../constants';
import cn from '../../components/helpers/classNameConcat';
import Link from '../../components/Link';

const blurRadius = 5
const shadowColor = '#035BA2'

const styles = makeStyles(theme => ({
  page: {
    // Fall Back background color
    backgroundColor: '#6bb1e7',
    // Background color
    background: 'linear-gradient(to bottom right,#6bb1e7,#67cbda)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    width: '100%',
  },
  gridContainer: {
    margin: '240px 0 0 0',
    padding: '24px',
    width: '100%',
    flex: '1 0 auto',
  },
  four0four: {
    color: '#E0F4FC',
    fontFamily: 'Inter',
    fontSize: '400px',
    fontWeight: '600',
    lineHeight: '400px',
    textShadow: `1px 1px ${blurRadius}px ${shadowColor},
                -1px -1px ${blurRadius}px ${shadowColor},
                1px -1px ${blurRadius}px ${shadowColor}, 
                -1px 1px ${blurRadius}px ${shadowColor},
                0px 0px ${blurRadius}px ${shadowColor}`
  },
  fFour: {
    color: '#E0F4FC',
  },
  zero: {
    color: '#A3E0FF',
  },
  lFour: {
    color: '#6EBEFF',
  },
  pageNotFound: {
    fontSize: '35px',
    fontWeight: '600',
    lineHeight: '45px',
    color: '#00344F',
    marginTop: '8px'
  },
  pageNotFoundInfo: {
    fontSize: '16px',
    lineHeight: '25px',
    color: '#00344F',
    marginTop: '25px',
    marginBottom: '186px'
  },
  goBackHome: {
    color: 'black',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    fontWeight: 'bold',
  },
  "@media (max-width: 900px)": {
    four0four: {
      fontSize: '250px',
      lineHeight: '250px',
    },
    pageNotFound: {
      fontSize: '28px',
      fontWeight: '600',
      lineHeight: '45px',
    },
  },
  "@media (max-width: 650px)": {
    four0four: {
      fontSize: '150px',
      lineHeight: '150px',
    },
    pageNotFound: {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '45px',
    },
  }
}));
const MTPNotFoundPage = ({location}) => {
  const classes = styles()
  return (
    <div className={classes.page}>
      <NCIHeader/>
      <Grid
        container
        justify={'center'}
        spacing={3}
        className={classes.gridContainer}
      >
        <Grid item xs={12} md={11}>
          <Helmet title={appTitle}>
            <meta name="description" content={appDescription} />
            <link
              rel="canonical"
              href={appCanonicalUrl + (location || '')}
            />
          </Helmet>
          <Typography align='center'>
            <span className={cn(classes.four0four, classes.fFour)}>4</span>
            <span className={cn(classes.four0four, classes.zero)}>0</span>
            <span className={cn(classes.four0four, classes.lFour)}>4</span>
        
            <p className={classes.pageNotFound}>
              Page not found.
            </p>

            <p className={classes.pageNotFoundInfo}>
              The page you are looking for does not exist or another error has occurred. <br/>
              Go back or head 
              <Link to="/" className={classes.goBackHome}> home </Link> 
              to choose another direction.
            </p>
          </Typography>
        </Grid>
      </Grid>
      <NCIFooter/>
    </div>

  );
};

export default MTPNotFoundPage;
