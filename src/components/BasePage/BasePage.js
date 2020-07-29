import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core';

import Search from '../Search/Search';
import { Page, NavBar, Footer } from 'ot-ui';
import { externalLinks, mainMenuItems } from '../../constants';

const useStyles = makeStyles({
  searchContainer: {
    minWidth: '400px',
  },
});

const BasePage = ({ children }) => {
  const classes = useStyles();
  return (
    <Page
      header={
        <NavBar
          name="Platform"
          search={
            <div className={classes.searchContainer}>
              <Search embedded />
            </div>
          }
          items={mainMenuItems}
        />
      }
      footer={<Footer externalLinks={externalLinks} />}
    >
      <Helmet
        defaultTitle="Open Targets Platform"
        titleTemplate="%s | Open Targets Platform"
      />
      {children}
    </Page>
  );
};

export default BasePage;
