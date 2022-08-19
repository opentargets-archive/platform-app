import React from 'react';
import  LogoBar  from './LogoBar';

const headerData = {
  globalHeaderLogo: 'https://raw.githubusercontent.com/CBIIT/mtp-config/main/front-end/assets/images/CCDI-MT-Logo-COLOR.svg',
  globalHeaderLogoLink: '/',
  globalHeaderLogoAltText: 'MTP Logo',
  globalHeaderImage: '',
};


const customStyle = {
  nihLogoImg: {
    height: '110px',
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
    <LogoBar
      logo={headerData.globalHeaderLogo}
      easter={headerData.globalHeaderImage}
      alt={headerData.globalHeaderLogoAltText}
      homeLink={headerData.globalHeaderLogoLink}
      customStyle={customStyle}
    />
  </>
);
export default NCIHeader;
