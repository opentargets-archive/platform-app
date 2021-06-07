import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';

function RelevantIcon(aWidth = 0, aHeight = 0) {
  const useStyles = makeStyles(theme => ({
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      backgroundColor: '#3489CA',
      display: 'inline-flex',
      cursor: 'pointer',
      fontSize: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  return (
    <Avatar
      className={classes.avatar}
      alt="Relevant Molecular Target Icon"
      title="Relevant Molecular Target"
    >
      R
    </Avatar>
  );
}

export default RelevantIcon;
