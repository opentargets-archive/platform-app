import React, { Fragment } from 'react';
import {
  AppBar,
  Toolbar,
  withStyles,
  Popover,
  IconButton
} from '@material-ui/core';
import cn from '../helpers/classNameConcat';
import { Menu } from '@material-ui/icons';
import Close from '@material-ui/icons/Close';
import { NavLink } from 'react-router-dom';

const SmallerScreenNB = ({
  classes, isSidebarOpened, navBarData, navBarstyling, innerWidth, anchorEl, setAnchorEl
}) => {

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'mobileExpandedViewMenu' : undefined;
  
  return (
    <>
 
      <AppBar
      position="relative"
      className={cn(classes.appBar, {
        [classes.appBarShift]: isSidebarOpened,
      })}
      >
        <Toolbar className={classes.mobileToolbar}>
          <IconButton
            aria-describedby={id}
            onClick={open ? handleClose : handleClick}
          >
            {open ? <Close className={classes.mobileIcon}/> : <Menu className={classes.mobileIcon}/> }
          </IconButton>
        </Toolbar>
      </AppBar>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        elevation={1}
        marginThreshold={0}
        anchorPosition={{ top: 185, left: 0 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            boxShadow: 'none',
            width: innerWidth,
            maxWidth: innerWidth,
          },
        }} 
        className={classes.PopoverStyle}
      >
        <div>
          <ul className={classes.ulStyle}>
            {
              navBarData.slice(0, navBarData.length).map( (navItem, index) => ( 
                navItem.type === "dropdown" 
                ? 
                  <Fragment key={"fragment" + index}>
                    <li className={classes.liStyle} key={index}>
                      <NavLink to={navItem.link} onClick={handleClose} className={classes.navLink}>
                        {navItem.labelText}
                      </NavLink>
                    </li>
                    <ul className={classes.ulStyle}>
                      {navItem.dropDownLinks.slice(0, navItem.dropDownLinks.length).map((dropDownNavItem, dIndex) => 
                        (
                          <li className={classes.liStyle} key={index + '_' + dIndex}>
                            <NavLink to={dropDownNavItem.link} onClick={handleClose} className={classes.navLink}>
                              <span className={classes.greaterSign}>{'>'}</span> {dropDownNavItem.labelText}
                            </NavLink>
                          </li>
                        )
                      )}
                    </ul>
                  </Fragment>
                : 
                  <li className={classes.liStyle} key={index}>
                    <NavLink to={navItem.link} onClick={handleClose} className={classes.navLink}>
                      {navItem.labelText}
                    </NavLink>
                  </li>
              ))
            }
          </ul>
        </div>
      </Popover>
    </>
  )
}

const styles = () => ({
  appBar: (props) => ({
    backgroundColor: props.navBarstyling.global.backgroundColor ? props.navBarstyling.global.backgroundColor : '#142D64',
    width: '100vw',
    boxShadow: 'none',

  }),
  mobileToolbar: (props) => ({
    minHeight: props.navBarstyling.global.height ? props.navBarstyling.global.height : '59px',
    paddingLeft: '28px',
  }),
  ulStyle: {
    margin: '0',
    padding: '0',
    width: '100%',
    fontSize: '22px',
    fontFamily: 'Nunito Sans',
    listStyle: 'none',
  },
  liStyle: {
    display: 'block',
    textDecoration: 'none',
  },
  mobileIcon: {
    color: 'white',
    fontSize: '40px'
  },
  navLink: {
    display: 'block',
    minHeight: '53px',
    textDecoration: 'none',
    backgroundColor: '#005BA0',
    color: '#FFFFFF',
    padding: '10px 31px',
    borderBottom: '1px solid #2488D4',
    '&:hover': {
      backgroundColor: 'white',
      color: "#0B3557",
      fontWeight: 'bold',
    }
  },
  greaterSign: {
    padding: '0 10px 0 15px',
  }
})

SmallerScreenNB.defaultProps = {
  classes: {},
  navBarstyling: {},
};

const StyledNavBar = withStyles(styles)(SmallerScreenNB);
export default StyledNavBar;