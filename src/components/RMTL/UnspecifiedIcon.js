import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: 'gray',
    display: 'inline-flex',
    cursor: 'pointer',
    fontSize: theme.spacing(2),
  },
}));

function RelevantIcon() {
  const classes = useStyles();
  return (
    <Avatar
      className={classes.avatar}
      alt="Unspecified Target Icon"
      title="Unspecified Target"
    >
      ?
    </Avatar>
  );
}

export default RelevantIcon;
