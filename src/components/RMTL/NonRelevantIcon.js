import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: '#3489CA',
    display: 'inline-flex',
    cursor: 'pointer',
    fontSize: theme.spacing(1.9),
  },
}));

function NonRelevantIcon() {
  const classes = useStyles();
  return (
    <Avatar
      alt="Non-Relevant Molecular Target Icon"
      className={classes.avatar}
      title="Non-Relevant Molecular Target"
    >
      NR
    </Avatar>
  );
}

export default NonRelevantIcon;
