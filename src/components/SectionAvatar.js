import React from 'react';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.grey[300],
  },
  avatarHasData: {
    backgroundColor: theme.palette.primary.main,
  },
});

const SectionAvatar = ({ classes, name, icon, hasData }) => (
  <Avatar
    className={classNames({
      [classes.avatar]: true,
      [classes.avatarHasData]: hasData,
    })}
  >
    {name
      .split(' ')
      .map(d => d[0].toUpperCase())
      .join('')}
  </Avatar>
);

export default withStyles(styles)(SectionAvatar);
