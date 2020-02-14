import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import LongText from './LongText';

const styles = () => ({
  description: {
    marginBottom: '5px',
  },
});

const Description = ({ classes, children }) => {
  return (
    <div className={classes.description}>
      <Typography variant="subtitle2">Description</Typography>
      {children ? (
        <LongText lineLimit="3">{children}</LongText>
      ) : (
        'No description available'
      )}
    </div>
  );
};

export default withStyles(styles)(Description);
