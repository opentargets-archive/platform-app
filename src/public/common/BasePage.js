import React from 'react';
import { Helmet } from 'react-helmet';
import { Page, NavBar, Footer } from 'ot-ui';

import { externalLinks, mainMenuItems } from '../../constants';
import Search from './search/Search';

const BasePage = ({ children }) => (
  <Page
    header={
      <NavBar name="Platform" search={<Search />} items={mainMenuItems} />
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

export default BasePage;
