import React from 'react';
import NavBar from './NavBarView';

export const navBarstyling = {
  global: {
    backgroundColor: '#0B3557',
    height: '59px',
    padding: '13px 28px 10px 29px',
    fontFamily: 'Raleway, sans-serif',
    activeLabel: '1px solid  #efefef',
    paddingRight: '65px',
    paddingLeft: '55px',
    fontWeight: '600',
    letterSpacing: '1px',
    alignItems: 'center',
    fontSize: '14px',
  },
  dropDownIcon: {
    displayIcon: true,
    fontSize: '18px',
    margin: '0px 0px 0px 0px',
  },
  dropdownMenu: {
    paper: {
      background: '#309EC4',
      width: '200px',
      padding: '5px 18px 18px 18px',
      marginLeft: '15px',
      position: 'absolute',
      marginTop: '-1px',
      borderRadius: '0',
    },
    link: {
      overflowWrap: 'normal',
      textDecoration: 'none',
      color: 'black',
      fontSize: '14px',
      fontWeight: '600',
      lineSpacing: '1px',
      lineHeight: '18px',
      fontFamily: 'Raleway, sans-serif',
      display: 'block',
      marginTop: '10px',
      '&:hover': {
        cursor: 'pointer',
        color: 'white',
      },
    },
  },
};

export const navBarData = [
  {
    labelText: 'Home',
    type: 'link',
    link: '/',
  },
  {
    labelText: 'FDA Pediatric Molecular Target Lists',
    type: 'link',
    link: '/fda-pmtl',
  },
  {
    labelText: 'About',
    type: 'link',
    link: '/about',
  },
  {
    labelText: 'Pediatric Cancer Data Navigation',
    type: 'link',
    link: '/pediatric-cancer-data-navigation',
    emphasize: true,
  },
];


const NCINavBar = ({ cartFieldIds }) => (
  <>
    <NavBar
      navBarData={navBarData}
      navBarstyling={navBarstyling}
    />
  </>
);
export default NCINavBar;
