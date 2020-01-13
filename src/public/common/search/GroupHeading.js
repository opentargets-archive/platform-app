import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  groupHeading: {
    padding: '0 0.5rem',
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },
  groupHeadingText: {
    fontSize: '0.75rem',
    color: theme.palette.secondary.main,
  },
});

const GroupHeading = ({ classes, children }) => {
  return (
    <div className={classes.groupHeading}>
      <Typography className={classes.groupHeadingText} variant="body1">
        {children}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(GroupHeading);
