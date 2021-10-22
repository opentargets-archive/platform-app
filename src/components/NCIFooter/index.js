import React from 'react';
import Footer from './Footer';


const FooterData = {
  bg: '#325068',
  footerLogoImage: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/footer/FNL_logo.png',
  footerLogoAltText: 'Footer Logo',
  footerLogoHyperlink: 'https://frederick.cancer.gov/',
  footerStaticText: 'NIH … Turning Discovery Into Health®',
   version: "mvp1",
  BEversion: "mvp1",
  // A maximum of 3 Subsections (link_sections) are allowed
  // A maximum of 4 Subsection Links ('items' under link_sections) are allowed
  // A maximum of 4 Anchor Links (global_footer_links) are allowed
  // Ideal size for icon is 20x20 px
  link_sections: [

    {
      title: 'More Information',
      items: [
        {
          text: 'Policies',
          link: 'https://www.cancer.gov/global/web/policies',
          title: 'link to NCI policies',
        },
        {
          text: 'Disclaimer',
          link: 'https://www.cancer.gov/policies/disclaimer',
        },
        {
          text: 'Accessibility',
          link: 'https://www.cancer.gov/policies/accessibility',
        },
        {
          text: 'FOIA',
          link: 'https://www.cancer.gov/policies/foia',
        },
      ],
    },
  ],
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
const NCIFooter = () => <><Footer data={FooterData} background={FooterData.bg} /></>;


export default NCIFooter;