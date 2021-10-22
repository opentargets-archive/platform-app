import React from 'react';
import {
  Button, withStyles,
} from '@material-ui/core';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import DropdownItemsMenu from './DropdownItemsMenu';

const DropdownMenu = ({
  classes, handleButtonClickEvent, linkText, clickedEl, dropDownElements, navBarstyling,
}) => {
  const [displayDropDownMenu, setDisplayDropDownMenu] = React.useState(false);

  function handleClick() {
    setDisplayDropDownMenu(true);
  }

  function handleMoveOut() {
    setDisplayDropDownMenu(false);
  }

  function dropdownMenuClickEvent() {
    setDisplayDropDownMenu(false);
    handleButtonClickEvent('aboutMenu');
  }

  return (
    <div
      onMouseEnter={handleClick}
      onMouseLeave={handleMoveOut}
      className={classes.aboutMenu}
    >
      <Button
        id="button_navbar_about"
        weight="medium"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onFocus={handleClick}
        className={classes.logotype}
        classes={{ root: classes.buttonRoot }}
      >
        <span className={clickedEl === 'aboutMenu' ? classes.buttonRootClicked : ''} id={`navbar_dropdown_${linkText}`}>
          { linkText }
        </span>
        {navBarstyling.dropDownIcon.displayIcon === true ? <ExpandMoreRoundedIcon className={classes.dropDownicon} /> : ''}
      </Button>
      {displayDropDownMenu ? <DropdownItemsMenu navBarstyling={navBarstyling} handleClick={dropdownMenuClickEvent} dropDownElements={dropDownElements} /> : ''}
    </div>
  );
};

const styles = () => ({
  logotype: (props) => ({
    whiteSpace: 'nowrap',
    color: props.navBarstyling.global.fontColor ? props.navBarstyling.global.fontColor : '#FFFFFF',
    fontFamily: props.navBarstyling.global.fontFamily ? props.navBarstyling.global.fontFamily : 'Nunito',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.9px',
    // [theme.breakpoints.down('xs')]: {
    //   display: 'none',
    // },
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  }),
  buttonRoot: (props) => ({
    padding: props.navBarstyling.global.padding ? props.navBarstyling.global.padding : '9px 20px 0px 20px',
  }),
  buttonRootClicked: {
    borderBottom: '2px solid #FFFFFF',
  },
  dropDownicon: (props) => ({
    fontSize: props.navBarstyling.dropDownIcon.fontSize ? props.navBarstyling.dropDownIcon.fontSize : '18px',
    margin: props.navBarstyling.dropDownIcon.margin ? props.navBarstyling.dropDownIcon.margin : '0px 0px 0px 0px',
  }),
  aboutMenu: {
    display: 'inline-block',
  },
});

DropdownMenu.defaultProps = {
  navBarstyling: {},
};

export default withStyles(styles)(DropdownMenu);
