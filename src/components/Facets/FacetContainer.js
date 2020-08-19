import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  withStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  facetContainer: {
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  childrenContainer: {
    paddingTop: '10px',
    paddingRight: '16px',
  },
});

const FacetContainer = ({ classes, name, children }) => (
  <ExpansionPanel className={classes.facetContainer} elevation={0}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>{name}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className={classes.childrenContainer}>
      {children}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default withStyles(styles)(FacetContainer);
