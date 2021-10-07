import React from 'react';
import { Helmet } from 'react-helmet';
import Search from './Search';
import Page from './Page';
import NCIFooter from './NCIFooter';
import NCIHeader from './NCIHeader';
import LinkBar from './LinkBar'; 
import NCINavBar from './NCINavBar';
import NavBar from './NavBar';

import {
  appTitle,
  appDescription,
  appCanonicalUrl,
  externalLinks,
  mainMenuItems,
} from '../constants';

const BasePage = ({ title, children, description, location }) => {
  const composedTitle = `${title ? title + ' | ' : ''} ${appTitle}`;

  return (
    <Page
      header={
      <>
        <LinkBar/>
        <NCIHeader/>
        <NCINavBar/>
         <NavBar
          name="Platform"
          search={<Search embedded />}
          items={mainMenuItems}
        />
      </>
      }
      footer={<NCIFooter/>}
    >
      <Helmet title={composedTitle}>
        <meta name="description" content={description || appDescription} />
        <link
          rel="canonical"
          href={appCanonicalUrl + (location?.pathname || '')}
        />
      </Helmet>
      {children}
    </Page>
  );
};

export default BasePage;
