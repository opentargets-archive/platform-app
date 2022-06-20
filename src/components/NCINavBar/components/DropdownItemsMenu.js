import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  withStyles, Paper,
} from '@material-ui/core';
import cn from '../../helpers/classNameConcat';

const CustomDropdownMenu = ({ classes, dropDownElements }) => (
  <>
  <div className={classes.arrowUp}></div>
  <Paper className={classes.paper}>
    <div id="aboutDropDown">
      {dropDownElements.map((dropDownElementsItem) => (
          <NavLink
            className={
                dropDownElementsItem.sublink
                  ? cn(classes.sublink, classes.link)
                  : classes.link
            }
            activeClassName={classes.activeLink}
            to={dropDownElementsItem.link}
          >
            {dropDownElementsItem.labelText}
          </NavLink>
      ))}
    </div>
  </Paper>
  </>
);

const styles = () => ({
  paper:{
      background: '#E8F5FF',
      width: '267px',
      padding: '8px 9px 16px 33px',
      position: 'absolute',
      margin: '150px 0px 0px -5px',
      borderRadius: '0',
  },
  arrowUp:{
    width: 0, 
    height: 0, 
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: '13px solid #E8F5FF',
    background: 'transparent',
    position: 'absolute',
    margin: '50px 0px 0px 27px',
  },
  sublink: (props) => {
    const defaultProps = {
      fontWeight: '500 !important',
    };
    return Object.assign(defaultProps, props.navBarstyling
      ? props.navBarstyling.dropdownMenu ? props.navBarstyling.dropdownMenu.sublink : {} : {});
  },
  link: {
      textDecoration: 'none',
      color: '#0C375E',
      fontFamily: 'Nunito Sans',
      fontSize: '18px',
      lineHeight: '20px',
      display: 'block',
      marginTop: '13px',
      '&:hover': {
        cursor: 'pointer',
        color: '#0091FF',
      }
  },
  activeLink:{
    fontWeight: '800',
  }
});

CustomDropdownMenu.defaultProps = {
  classes: {},
  statsStyling: {},
};

export default withStyles(styles)(CustomDropdownMenu);
