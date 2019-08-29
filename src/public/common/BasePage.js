import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Page, NavBar, Footer } from 'ot-ui';

import { externalLinks } from '../../constants';

const BasePage = ({ children }) => (
  <Page
    header={<NavBar linkComponent={RouterLink} name="Platform" />}
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
