import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Tooltip as MuiTooltip,
  withStyles,
} from '@material-ui/core';
import classnames from 'classnames';
import DropdownMenu from './components/DropdownMenu';

const drawerWidth = 240;

const NavBar = ({
  classes, isSidebarOpened, navBarData, navBarCartData, navBarstyling, numberOfCases, components = {},
}) => {
  // Similar to componentDidMount and componentDidUpdate:
  // Empty second argument of react useEffect will avoid the infinte loop that
  // caused due to component update
  const [clickedEl, setClickedEl] = React.useState(null);

  function handleButtonClickEvent(eventName) {
    setClickedEl(eventName);
  }

  const Tooltip = components.Tooltip || MuiTooltip;

  return (
    <AppBar
      position="fixed"
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
                  handleButtonClickEvent={handleButtonClickEvent}
                  clickedEl={clickedEl}
                  linkText={navButton.labelText}
                  dropDownElements={navButton.dropDownLinks.slice(0, 9)}
                  navBarstyling={navBarstyling}
                />
              )
              : (
                <Button id="button_navbar_navButton" disableRipple weight="medium" className={classes.logotype} classes={{ root: classes.buttonRoot }}>
                  <HashRouter>
                    <NavLink
                      className={classes.labelText}
                      activeClassName={classes.activeLabel}
                      to={navButton.link ? navButton.link : '/'}
                      onClick={() => handleButtonClickEvent(`${navButton.labelText}`)}
                    >
                      {navButton.labelText}
                    </NavLink>
                  </HashRouter>
                </Button>
              )
          ))}
        </div>
        {/* Start of Theme Switching Icon and logic */}
        <div className={classes.myCasesPosition}>
          <Button id="button_navbar_mycases" disableRipple weight="medium" className={classes.logotype} classes={{ root: classes.buttonRootNoRightPadding }}>
            <HashRouter>
              <NavLink
                className={classes.cartLabelText}
                to={navBarCartData.cartLink}
              >
                {navBarCartData.cartLabel}
                {/* <Badge badgeContent={numberOfCases} max={99999}> */}
                <Tooltip title="Files" placement="bottom-end">
                  <span className={classes.badge}>
                    <img
                      className={classes.cartIcon}
                      src={navBarCartData.cartIcon}
                      alt={navBarCartData.cartIconAlt}
                    />
                    <span className={classes.cartCounter}>
                      {numberOfCases}
                    </span>
                  </span>
                </Tooltip>

                {/* </Badge> */}
              </NavLink>
            </HashRouter>
          </Button>
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
    fontFamily: props.navBarstyling.global.fontFamily ? props.navBarstyling.global.fontFamily : 'Raleway',
    fontSize: '11px',
    letterSpacing: props.navBarstyling.global.letterSpacing ? props.navBarstyling.global.letterSpacing : '1.25px',
    fontWeight: props.navBarstyling.global.fontWeight ? props.navBarstyling.global.fontWeight : '800',
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  }),
  buttonContainer: {
    margin: '0 auto',
  },
  appBar: (props) => ({
    backgroundColor: props.navBarstyling.global.backgroundColor ? props.navBarstyling.global.backgroundColor : '#142D64',
    marginTop: props.navBarstyling.global.marginTop ? props.navBarstyling.global.marginTop : '100px',
    width: '100vw',
  }),
  cartIcon: {
    height: '22px',
    margin: '0px 0px 0px 6px',
  },
  labelText: (props) => ({
    textDecoration: 'none',
    color: props.navBarstyling.global.fontColor ? props.navBarstyling.global.fontColor : '#FFFFFF',
    fontFamily: props.navBarstyling.global.fontFamily ? props.navBarstyling.global.fontFamily : 'Nunito',
    fontSize: '13px',
  }),
  cartLabelText: (props) => ({
    textDecoration: 'none',
    color: props.navBarstyling.global.fontColor ? props.navBarstyling.global.fontColor : '#FFFFFF',
    fontFamily: props.navBarstyling.global.fontFamily ? props.navBarstyling.global.fontFamily : 'Nunito',
    fontSize: '13px',
  }),
  activeLabel: (props) => ({
    borderBottom: props.navBarstyling.global.activeLabel ? props.navBarstyling.global.activeLabel : '1px solid  #FFFFFF',
  }),
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
    alignItems: 'flex-start',
  }),
  buttonRoot: (props) => ({
    padding: props.navBarstyling.global.padding ? props.navBarstyling.global.padding : '9px 20px 0px 20px',
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
  // headerMenuButton: {
  //   marginLeft: theme.spacing.unit,
  //   padding: theme.spacing.unit / 2,
  // },
});

NavBar.defaultProps = {
  classes: {},
  navBarstyling: {},
};

const StyledNavBar = withStyles(styles)(NavBar);
export default StyledNavBar;
