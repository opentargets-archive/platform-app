import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  ellipseContainer: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    verticalAlign: 'bottom',
  },
}));

function EllsWrapper({ children, title }) {
  const classes = useStyles();

  return (
    <div className={classes.ellipseContainer} title={title || children}>
      {children}
    </div>
  );
}

export default EllsWrapper;
