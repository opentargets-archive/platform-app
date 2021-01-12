import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import OpenTargetsTitle from './OpenTargetsTitle';
import HeaderMenu from './HeaderMenu';

const styles = theme => ({
  navbar: {
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    width: '100%',
  },
  navbarHomepage: {
    left: 0,
    top: 0,
    position: 'absolute',
    background: 'none',
    boxShadow: 'none',
  },
  flex: {
    flexGrow: 1,
  },
  menuExternalLinkContainer: {
    fontSize: '1rem',
    '&:first-of-type': {
      marginLeft: '1rem',
    },
    '&:not(:last-child)': {
      marginRight: '1rem',
    },
  },
  menuExternalLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
});

const MenuExternalLink = ({ classes, href, children }) => (
  <Typography color="inherit" className={classes.menuExternalLinkContainer}>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={classes.menuExternalLink}
    >
      {children}
    </a>
  </Typography>
);

const NavBar = ({
  classes,
  name,
  search,
  api,
  downloads,
  docs,
  contact,
  homepage,
  items,
  placement,
}) => (
  <AppBar
    className={classNames(classes.navbar, {
      [classes.navbarHomepage]: homepage,
    })}
    position="static"
    color="primary"
    elevation={0}
  >
    <Toolbar variant="dense">
      {homepage ? null : (
        <Button component={Link} to="/" color="inherit">
          <OpenTargetsTitle name={name} />
        </Button>
      )}
      <div className={classes.flex} />
      {search ? search : null}

      {docs ? (
        <MenuExternalLink classes={classes} href={docs}>
          Docs
        </MenuExternalLink>
      ) : null}

      {api ? (
        <MenuExternalLink classes={classes} href={api}>
          API
        </MenuExternalLink>
      ) : null}

      {downloads ? (
        <MenuExternalLink classes={classes} href={downloads}>
          Downloads
        </MenuExternalLink>
      ) : null}

      {contact ? (
        <MenuExternalLink classes={classes} href={contact}>
          Contact
        </MenuExternalLink>
      ) : null}

      {items ? <HeaderMenu items={items} placement={placement} /> : null}
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(NavBar);
