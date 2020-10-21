import React from 'react';
import { Helmet } from 'react-helmet';

import Search from './Search';
import { Page, NavBar, Footer } from 'ot-ui';
import { appTitle, externalLinks, mainMenuItems } from '../constants';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  footerContainer: {
    zIndex: 1001,
  },
});

const BasePage = ({ title, children }) => {
  const classes = useStyles();
  const composedTitle = `${title ? title + ' | ' : ''} ${appTitle}`;

  return (
    <Page
      header={
        <NavBar
          name="Platform"
          search={<Search embedded />}
          items={mainMenuItems}
        />
      }
      footer={
        <Box className={classes.footerContainer}>
          <Footer externalLinks={externalLinks} />
        </Box>
      }
    >
      <Helmet title={composedTitle} />
      {children}
    </Page>
  );
};

export default BasePage;
