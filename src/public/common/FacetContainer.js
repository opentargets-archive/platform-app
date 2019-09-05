import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  facetContainer: {
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  childrenContainer: {
    paddingTop: '10px',
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
