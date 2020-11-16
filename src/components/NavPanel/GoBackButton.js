import React from 'react';
import { animateScroll } from 'react-scroll';
import { Avatar, List, ListItem, ListItemText } from '@material-ui/core';
import { Home } from '@material-ui/icons';

import navPanelStyles from './navPanelStyles';

function GoBackButton() {
  const classes = navPanelStyles();

  const handleHomeButtonClick = () => {
    animateScroll.scrollToTop({ duration: 500, smooth: true });
  };

  // Uses a list/listItem to keep same style as the section list.
  return (
    <List className={classes.listHome}>
      <ListItem
        button
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
