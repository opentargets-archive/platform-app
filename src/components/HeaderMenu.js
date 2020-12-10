import React, { Component, Fragment } from 'react';
import {
  MenuItem,
  Popper,
  MenuList,
  IconButton,
  Fade,
  Paper,
  ClickAwayListener,
} from '@material-ui/core';
import { Menu as MenuIcon, Close as CloseIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Link from './Link';

const styles = () => ({
  icon: {
    marginLeft: '20px',
  },
  menuLink: {
    width: '100%',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  menuItem: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
});
class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleMenuToggle = event => {
    const { anchorEl } = this.state;
    this.setState({
      anchorEl: anchorEl === null ? event.currentTarget : null,
    });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.setState({
        anchorEl: null,
      });
    }
  };

  render() {
    const { anchorEl } = this.state;
    const { items, placement, classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <Fragment>
        <IconButton
          className={classes.icon}
          size="medium"
          color="inherit"
          aria-label="open header menu"
          aria-haspopup="true"
          onClick={this.handleMenuToggle}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <Popper
          open={isMenuOpen}
          anchorEl={anchorEl}
          role={undefined}
          transition
          disablePortal
          placement={placement || 'bottom-start'}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={this.handleMenuClose}>
                  <MenuList onKeyDown={this.handleListKeyDown}>
                    {items.map((item, i) => (
                      <MenuItem
                        onClick={this.handleMenuClose}
                        key={i}
                        dense={true}
                        className={classes.menuItem}
                      >
                        <Link
                          external={item.external}
                          to={item.url}
                          className={classes.menuLink}
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Fragment>
    );
  }
}

export default withStyles(styles)(HeaderMenu);
