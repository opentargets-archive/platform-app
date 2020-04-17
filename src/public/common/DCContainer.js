import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  dc: {
    backgroundColor: 'white',
  },
});

const DCContainer = ({ id, title = '<title>', classes }) => (
  <div id={id} className={classes.dc}>
    <strong>{title}</strong>
    <div className="clearfix" />
  </div>
);

export default withStyles(styles)(DCContainer);
