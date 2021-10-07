import React from 'react';
import  Header  from './Header';

const headerData = {
  globalHeaderLogo: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/icdc_nih_logo.svg',
  globalHeaderLogoLink: '/',
  globalHeaderLogoAltText: 'ICDC Logo',
  globalHeaderImage: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/png/header_Canine3000.png',
};


const customStyle = {
  nihLogoImg: {
    height: '54px',
    width: '463px',
    marginLeft: '28px',
    minHeight: '54px',
  },
  headerBar: {
    top: '20px',
    zIndex: '999',
  },
};

const NCIHeader = () => (
  <>
    <Header
      logo={headerData.globalHeaderLogo}
      easter={headerData.globalHeaderImage}
      alt={headerData.globalHeaderLogoAltText}
      homeLink={headerData.globalHeaderLogoLink}
      customStyle={customStyle}
    />
  </>
);
export default NCIHeader;
