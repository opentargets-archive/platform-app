import React from 'react';
import NavBar from './NavBarView';

export const navBarstyling = {
  global: {
    backgroundColor: '#0B3557',
    height: '39px',
    padding: '9px 20px 0px 20px',
    marginTop: '120px',
    fontFamily: 'Raleway, sans-serif',
    activeLabel: '2px solid  #35b9eb',
    paddingRight: '65px',
    paddingLeft: '55px',
    fontWeight: '600',
    letterSpacing: '1px',
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
    labelText: 'HOME',
    type: 'link',
    link: '/home',
  },
  {
    labelText: 'FDA PMTL Documentation',
    type: 'link',
    link: '/cases',
  },
  {
    labelText: 'FDA PMTL',
    type: 'link',
    link: '/programs',
  },
  {
    labelText: 'Open Target Documentation',
    type: 'link',
    link: '/studies',
  },
  {
    labelText: 'ABOUT',
    type: 'link',
    link: '/about',
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
