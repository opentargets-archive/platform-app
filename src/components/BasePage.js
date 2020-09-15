import React from 'react';
import { Helmet } from 'react-helmet';

import Search from './Search';
import { Page, NavBar, Footer } from 'ot-ui';
import { externalLinks, mainMenuItems } from '../constants';

const BasePage = ({ children }) => {
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
      <Helmet
        defaultTitle="Open Targets Platform"
        titleTemplate="%s | Open Targets Platform"
      />
      {children}
    </Page>
  );
};

export default BasePage;
