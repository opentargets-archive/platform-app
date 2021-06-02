import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  rmtlIcon: {
    height: '20px',
    width: '20px',
    backgroundColor: '#3489CA',
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
    <span className={classes.rmtlIcon} title="Relevant Molecular Target">
      R
    </span>
  );
}

export default RelevantIcon;
