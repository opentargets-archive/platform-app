import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  rmtlIcon: {
    height: '20px',
    width: '20px',
    backgroundColor: '#3489CA',
    borderRadius: '50%',
    display: 'inline-block',
    'text-align': 'center',
    color: 'white',
    'line-height': '20px',
    'font-size': '12px',
  },
}));

function NonRelevantIcon() {
  const classes = useStyles();
  return (
    <span className={classes.rmtlIcon} title="Non-Relevant Molecular Target">
      NR
    </span>
  );
}

export default NonRelevantIcon;
