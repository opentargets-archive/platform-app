import React from 'react';
import {
  Button, withStyles,
} from '@material-ui/core';
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
    setDisplayDropDownMenu(true);
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
        onMouseEnter={handleClick}
        className={classes.logotype}
        classes={{ root: classes.buttonRoot }}
      >
        <span className={clickedEl === 'aboutMenu' ? classes.buttonRootClicked : ''} id={`navbar_dropdown_${linkText}`}>
          { linkText }
        </span>
      </Button>
      {displayDropDownMenu ? <DropdownItemsMenu navBarstyling={navBarstyling} handleClick={dropdownMenuClickEvent} dropDownElements={dropDownElements} /> : ''}
    </div>
  );
};

const styles = () => ({
  logotype: (props) => ({
    whiteSpace: 'nowrap',
    color: props.navBarstyling.global.fontColor ? props.navBarstyling.global.fontColor : '#FFFFFF',
    fontFamily: 'Nunito Sans',
    fontSize: '18px',
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
    display: 'inline-flex',
    padding: '0 5px',
    height: '59px',
    alignItems: 'center',
    '&:hover': {
        cursor: 'pointer',
        background: '#005BA0',
      },
  },
});

DropdownMenu.defaultProps = {
  navBarstyling: {},
};

export default withStyles(styles)(DropdownMenu);
