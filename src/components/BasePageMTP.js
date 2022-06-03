import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid, makeStyles } from '@material-ui/core';
import NCIFooter from './NCIFooter';
import NCIHeader from './NCIHeader';
import {
  appTitle,
  appDescription,
  appCanonicalUrl,
} from '../constants';


const useStyles = makeStyles(theme => ({
  page: {
    background: theme.palette.grey['50'],
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    width: '100%',
  },
  gridContainer: {
    margin: '190px 0 0 0',
    padding: '24px',
    width: '100%',
    flex: '1 0 auto',
  },
}));


const BasePageMTP = ({ title, children, description, location }) => {
  const composedTitle = `${title ? title + ' | ' : ''} ${appTitle}`;

  const classes = useStyles();
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
          <Helmet title={composedTitle}>
              <meta name="description" content={description || appDescription} />
              <link
                rel="canonical"
                href={appCanonicalUrl + (location?.pathname || '')}
              />
            </Helmet>
              {children}
          </Grid>
        </Grid>
        <NCIFooter/>
      </div>
  );
};

export default BasePageMTP;
