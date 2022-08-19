import React from 'react';
import Footer from './Footer';
import { contact, version } from '../../constants';
import usePlatformApi from '../../hooks/usePlatformApi';

const FooterData = {
  footerTitle: 'National Cancer Institute',
  footerSubTitle: 'at the National Institutes of Health',
  footerStaticText: 'NIH … Turning Discovery Into Health®',
  footerLogoLink: 'https://www.cancer.gov',
  FEversion: version.frontend,
  contactUs:`mailto:${contact.email}`,
  aboutPage: '/about',
  disclaimer: 'https://www.cancer.gov/policies/disclaimer',
  accessibility: 'https://www.cancer.gov/policies/accessibility',
  FOIA: 'https://www.cancer.gov/policies/foia',
  policies: 'https://www.cancer.gov/global/web/policies',
  vulnerability: 'https://www.hhs.gov/vulnerability-disclosure-policy/index.html',
  global_footer_links: [
    {
      text: 'U.S. Department of Health and Human Services',
      link: 'https://www.hhs.gov',
    },
    {
      text: 'National Institutes of Health',
      link: 'https://www.nih.gov',
    },
    {
      text: 'National Cancer Institute',
      link: 'https://www.cancer.gov',
    },
    {
      text: 'USA.gov',
      link: 'https://www.usa.gov',
    },
  ],
};
const NCIFooter = () => {
  const { loading, data } = usePlatformApi()
  const BEversion = loading ? "Loading..." : data?.meta?.mtpVersion?.version || version.backend

  return <><Footer data={{...FooterData, BEversion}} background={FooterData.bg} /></>;
}


export default NCIFooter;