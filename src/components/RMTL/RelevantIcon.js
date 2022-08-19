import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';

function RelevantIcon({
  inputWidth = 0,
  inputHeight = 0,
  inputFontSize = 0,
  cursor = 'pointer',
}) {
  const useStyles = makeStyles(theme => ({
    avatar: {
      width: inputWidth === 0 ? theme.spacing(3) : inputWidth,
      height: inputHeight === 0 ? theme.spacing(3) : inputHeight,
      backgroundColor: '#3489CA',
      display: 'inline-flex',
      cursor: cursor,
      fontSize: inputFontSize === 0 ? theme.spacing(2) : inputFontSize, // = 8 * 2
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
