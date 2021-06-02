import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  rmtlIcon: {
    height: '20px',
    width: '20px',
    backgroundColor: 'gray',
    borderRadius: '50%',
    display: 'inline-block',
    'line-height': '20px',
    'font-size': '12px',
    'text-align': 'center',
    color: 'white',
  },
}));

function RelevantIcon() {
  const classes = useStyles();
  return (
    <span className={classes.rmtlIcon} title="Unspecified Target">
      ?
    </span>
  );
}

export default RelevantIcon;
