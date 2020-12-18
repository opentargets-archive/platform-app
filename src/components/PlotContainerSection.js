import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  plotContainerSection: {
    padding: '4px 0',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
});

const PlotContainerSection = ({ classes, children }) => (
  <div className={classes.plotContainerSection}>{children}</div>
);

export default withStyles(styles)(PlotContainerSection);
