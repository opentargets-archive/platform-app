import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  avatar: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: '#eee',
  },
});

const SectionAvatar = ({ classes, name, icon, hasData }) => (
  <Avatar className={classes.avatar}>
    {name
      .split(' ')
      .map(d => d[0].toUpperCase())
      .join('')}
  </Avatar>
);

export default withStyles(styles)(SectionAvatar);
