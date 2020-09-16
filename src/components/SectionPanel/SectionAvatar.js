import React from 'react';
import classNames from 'classnames';
import { Avatar, withStyles } from '@material-ui/core';

const styles = theme => ({
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.grey[300],
  },
  avatarHasData: {
    backgroundColor: theme.palette.primary.main,
  },
  avatarError: {
    backgroundColor: theme.palette.secondary.main,
  },
});

const SectionAvatar = ({ classes, name, shortName, icon, hasData, error }) => (
  <Avatar
    className={classNames({
      [classes.avatar]: true,
      [classes.avatarHasData]: hasData,
      [classes.avatarError]: error,
    })}
  >
    {shortName ||
      name
        .split(' ')
        .map(d => d[0].toUpperCase())
        .join('')}
  </Avatar>
);

export default withStyles(styles)(SectionAvatar);
