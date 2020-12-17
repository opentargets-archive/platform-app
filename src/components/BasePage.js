import React from 'react';
import { Helmet } from 'react-helmet';

import Search from './Search';
import Page from './Page';
import NavBar from './NavBar';
import Footer from './Footer';
import { appTitle, externalLinks, mainMenuItems } from '../constants';

const BasePage = ({ title, children }) => {
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
      footer={<Footer externalLinks={externalLinks} />}
    >
      <Helmet title={composedTitle} />
      {children}
    </Page>
  );
};

export default BasePage;
