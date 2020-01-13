import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
};

const ValueContainer = ({ classes, children }) => {
  return <div className={classes.valueContainer}>{children}</div>;
};

export default withStyles(styles)(ValueContainer);
