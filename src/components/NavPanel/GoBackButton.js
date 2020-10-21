import React from 'react';
import { animateScroll } from 'react-scroll';
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  list: {
    paddingTop: '.2rem',
  },
  listItemHome: {
    padding: '.5rem .9375rem',
  },
  listItemAvatarHome: {
    height: '2rem',
    width: '2rem',
    backgroundColor: theme.palette.grey[700],
    marginRight: '1rem',
  },
}));

function GoBackButton() {
  const classes = useStyles();

  const handleHomeButtonClick = () => {
    animateScroll.scrollToTop({ duration: 500, smooth: true });
  };

  // Uses a list/listItem to keep same style as the section list.
  return (
    <List className={classes.list}>
      <ListItem
        className={classes.listItemHome}
        onClick={handleHomeButtonClick}
      >
        <Avatar className={classes.listItemAvatarHome}>
          <Home />
        </Avatar>
        <ListItemText primary="Back to top" />
      </ListItem>
    </List>
  );
}

export default GoBackButton;
