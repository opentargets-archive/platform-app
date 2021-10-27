import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import OpenTargetsTitle from './OpenTargetsTitle';

const styles = theme => ({
  navbar: {
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    width: '100%',
    zIndex: 40002,
    top: 194,
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
    position="fixed"
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
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(NavBar);
