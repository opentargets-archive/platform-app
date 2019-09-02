import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  facetContainer: {
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    marginTop: '4px',
    marginBottom: '8px',
  },
  childrenContainer: {
    marginTop: '4px',
    marginBottom: '4px',
  },
});

const FacetContainer = ({ classes, name, children }) => (
  <div className={classes.facetContainer}>
    <Typography>
      <strong>{name}</strong>
    </Typography>
    <div className={classes.childrenContainer}>{children}</div>
  </div>
);

export default withStyles(styles)(FacetContainer);
