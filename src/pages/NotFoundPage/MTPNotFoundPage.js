import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, Grid } from '@material-ui/core';

import NCIHeader from '../../components/NCIHeader';
import NCIFooter from '../../components/NCIFooter'
import { appTitle, appDescription, appCanonicalUrl } from '../../constants';

const styles = makeStyles(theme => ({
  page: {
    backgroundColor: theme.palette.grey['50'],
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    width: '100%',
  },
  gridContainer: {
    margin: '260px 0 0 0',
    padding: '24px',
    width: '100%',
    flex: '1 0 auto',
  },
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
          {/* Body Code here ... */}
        </Grid>
      </Grid>
      <NCIFooter/>
    </div>

  );
};

export default MTPNotFoundPage;
