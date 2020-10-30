import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  detailPanel: {
    background: `${theme.palette.grey[100]}`,
    marginTop: '10px',
    padding: '20px',
  },
});

class BibliograhpyDetailPanel extends Component {
  render = () => {
    const { classes, children } = this.props;

    return <div className={classes.detailPanel}>{children}</div>;
  };
}

export default withStyles(styles)(BibliograhpyDetailPanel);
