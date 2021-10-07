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
    labelText: 'home',
    type: 'link',
    link: '/home',
  },
  {
    labelText: 'cases',
    type: 'link',
    link: '/cases',
  },
  {
    labelText: 'programs',
    type: 'link',
    link: '/programs',
  },
  {
    labelText: 'Studies',
    type: 'link',
    link: '/studies',
  },
  {
    labelText: 'about',
    type: 'dropdown',

    dropDownLinks: [
      {
        labelText: 'Purpose',
        link: '/purpose',
        linkActiveStyle: 'white',
      },
      {
        labelText: 'Steering Committee',
        link: '/steeringCommittee',
        linkActiveStyle: 'white',
      },
      {
        labelText: '- Data Governance Advisory Board(DGAB)',
        link: '/DGAB',
        sublink: true,
        linkActiveStyle: 'white',
      },
      {
        labelText: '- Best Practices Sub-Committee(BPSC)',
        link: '/BPSC',
        sublink: true,
        linkActiveStyle: 'white',
      },
      {
        labelText: 'CRDC & Analysis',
        link: '/crdc',
        linkActiveStyle: 'white',
      },
      {
        labelText: 'ICDC Data & Model',
        link: '/icdc-data-model',
        linkActiveStyle: 'white',
      },
      {
        labelText: 'Developers',
        link: '/developers',
        linkActiveStyle: 'white',
      },
      {
        labelText: 'Support',
        link: '/support',
        linkActiveStyle: 'white',
      },
      {
        labelText: 'Submitting Data',
        link: '/submit',
        linkActiveStyle: 'white',
      },
    ],
  },
];

export const navBarCartData = {
  cartLabel: 'MY Files',
  cartLink: '/fileCentricCart',
  cartIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Icon-MyCases.svg',
  cartIconAlt: 'cart_logo',
};


const NCINavBar = ({ cartFieldIds }) => (
  <>
    <NavBar
      navBarData={navBarData}
      navBarCartData={navBarCartData}
      navBarstyling={navBarstyling}
    />
  </>
);
export default NCINavBar;
