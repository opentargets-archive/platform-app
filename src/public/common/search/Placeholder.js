import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  placeholder: {
    position: 'absolute',
    left: 2,
  },
};

const Placeholder = ({ classes, innerProps, children }) => {
  return (
    <Typography
      color="textSecondary"
      className={classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
};

export default withStyles(styles)(Placeholder);
