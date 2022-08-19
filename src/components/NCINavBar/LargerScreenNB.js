import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  withStyles,
} from '@material-ui/core';
import classnames from 'classnames';
import DropdownMenu from './components/DropdownMenu';
import NavIcon from '../../assets/PediatricDataCancer-MenuBar-Icon.svg'
import cn from '../helpers/classNameConcat';

const drawerWidth = 240;

const LargerScreenNB = ({
  classes, isSidebarOpened, navBarData, navBarstyling, numberOfCases, components = {},
}) => {
  // Similar to componentDidMount and componentDidUpdate:
  // Empty second argument of react useEffect will avoid the infinte loop that
  // caused due to component update
  const [clickedEl, setClickedEl] = React.useState(null);

  function handleButtonClickEvent(eventName) {
    setClickedEl(eventName);
  }
  
  function  getPCDNButton(navButton) {
    return (
      navButton.emphasize ?
        <Button key={navButton.labelText} disableRipple weight="medium" className={cn(classes.logotype, classes.pcdnButton)} 
          classes={{ root: classes.buttonRoot }}>
          <NavLink
            exact={true}
            className={cn(classes.labelText,classes.navLinkStyleForPCDN)}
            activeClassName={classes.activeLabelForPCDN}
            to={navButton.link ? navButton.link : '/'}
            onClick={() => handleButtonClickEvent(`${navButton.labelText}`)}
          >
            <img className={classes.navIcon} src={NavIcon} width="26px" height="27px" alt={"Navigation Icon"}/>
            <span className={classes.pcdnText}> {navButton.labelText} </span>
          </NavLink>
        </Button>
      : null
    )
  }

  return (
    <AppBar
      position="relative"
      className={classnames(classes.appBar, {
        [classes.appBarShift]: isSidebarOpened,
      })}
    >
      <Toolbar className={classes.toolbar}>

        {/* Sidebar button */}

        {/* End Sidebar button */}
        <div id="navbar" className={classes.buttonContainer}>
          {navBarData.slice(0, 5).map((navButton) => (
            navButton.type === 'dropdown'
              ? (
                <DropdownMenu
                  key={navButton.labelText}
                  handleButtonClickEvent={handleButtonClickEvent}
                  clickedEl={clickedEl}
                  linkText={navButton.labelText}
                  dropDownElements={navButton.dropDownLinks.slice(0, 9)}
                  navBarstyling={navBarstyling}
                  activeClassName={classes.activeLabel}
                />
              )
              : (
                navButton.emphasize 
                  ? getPCDNButton(navButton)
                  : <Button key={navButton.labelText} id="button_navbar_navButton" disableRipple 
                      weight="medium" className={classes.logotype} classes={{ root: classes.buttonRoot }}>
                      <NavLink
                        exact={true}
                        className={classes.labelText}
                        activeClassName={classes.activeLabel}
                        to={navButton.link ? navButton.link : '/'}
                        onClick={() => handleButtonClickEvent(`${navButton.labelText}`)}
                      >
                        {navButton.labelText}
                      </NavLink>
                    </Button>
              )
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
};

const styles = () => ({
  myCasesPosition: {
    position: 'absolute',
    right: '20px',
  },
  logotype: (props) => ({
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    fontFamily: props.navBarstyling.global.fontFamily ? props.navBarstyling.global.fontFamily : 'Nunito Sans',
    fontSize: '18px',
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  }),
  buttonContainer: {
    margin: '0 auto',
    height: '59px'
  },
  appBar: (props) => ({
    backgroundColor: props.navBarstyling.global.backgroundColor ? props.navBarstyling.global.backgroundColor : '#142D64',
    width: '100vw',
    boxShadow: 'none',
  }),
  cartIcon: {
    height: '22px',
    margin: '0px 0px 0px 6px',
  },
  pcdnButton: {
    height: '38px',
  },
  labelText: (props) => ({
    textDecoration: 'none',
    color: props.navBarstyling.global.fontColor ? props.navBarstyling.global.fontColor : '#FFFFFF',
    fontFamily: 'Nunito Sans',
    fontSize: '18px',
  }),
  activeLabel:{
    fontWeight: '800',
  },
  navLinkStyleForPCDN: (props) => ({
    height: '38px',
    width: '323px',
    border: '1px solid #FFFFFF',
    backgroundColor: "#4B8500",
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#437503'
    }
  }),
  activeLabelForPCDN: {
    backgroundColor: '#437503',
    fontWeight: '800',
  },
  appBarShift: {
    paddingRight: '0px !important',
    width: '100%',
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  toolbar: (props) => ({
    minHeight: props.navBarstyling.global.height ? props.navBarstyling.global.height : '39px',
    paddingRight: props.navBarstyling.global.paddingRight ? props.navBarstyling.global.paddingRight : '45px',
    paddingLeft: props.navBarstyling.global.paddingLeft ? props.navBarstyling.global.paddingLeft : '45px',
    alignItems: props.navBarstyling.global.alignItems ? props.navBarstyling.global.alignItems : 'flex-start',
    "@media (max-width: 1223px)": {
      paddingRight: 0,
      paddingLeft: 0,
    },
  }),
  buttonRoot: (props) => ({
    padding: '0px 28px 0px 29px',
    marginTop: '-6px',
  }),
  buttonRootNoRightPadding: (props) => ({
    padding: props.navBarstyling.global.padding ? props.navBarstyling.global.padding : '9px 20px 0px 20px',
  }),
  badge: {
    display: 'inline-flex',
    position: 'relative',
    verticalAlign: 'middle',
  },
  cartCounter: {
    height: '16px',
    minWidth: '16px',
    fontFamily: 'inter',
    fontWeight: '600',
    letterSpacing: '0.8px',
    transform: 'scale(1) translate(0%, -50%)',
  },
  iconButtonRoot: {
    paddingTop: '9px',
    paddingLeft: '0px',
  },
  floatRight: {
    float: 'right',
  },
  floatLeft: {
    float: 'left',
    marginTop: '6px',
    marginLeft: '10px',
  },
  funnelLogoImg: {
    width: '20px',
    height: '20px',
  },
  clearAllButtonRoot: {
    margin: 'auto',
  },
  customButton: {
    borderRadius: '100px',
    borderLeft: '0px',
    minHeight: '20px',
    fontSize: 9,
    textTransform: 'none',
    color: 'black',
    marginLeft: '16px',
    // fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
  },
  drawerAppBar: {
    height: '45px',
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '100px',
    zIndex: '1201',
    height: 'calc(100% - 100px)',
  },
  navIcon: {
    position: 'relative',
    top: '5px',
    left: '-3px',
    color: 'white',
  },
  pcdnText: {
    position: 'relative',
    top: '-3px',
    paddingLeft: '3px',
  },

});

LargerScreenNB.defaultProps = {
  classes: {},
  navBarstyling: {},
};

const StyledNavBar = withStyles(styles)(LargerScreenNB);
export default StyledNavBar;
