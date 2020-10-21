import React from 'react';
import { Drawer, makeStyles } from '@material-ui/core';

import GoBackButton from './GoBackButton';
import SectionList from './SectionList';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    width: '3.9375rem',
    '&:hover': {
      width: drawerWidth,
    },
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: { display: 'none' },
  },
  paper: {
    overflowX: 'hidden',
    width: 'inherit',
    zIndex: 1000,
    '&:hover': {
      boxShadow:
        '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
    },
  },
}));

function NavPanel({ ...props }) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{ root: classes.drawer, paper: classes.paper }}
    >
      <GoBackButton />
      <SectionList {...props} />
    </Drawer>
  );
}

export default NavPanel;
