import React from 'react';
import classNames from 'classnames';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  chipSource: {
    margin: '1px',
    height: '24px',
    // border: `1px solid ${theme.palette.grey[400]}`,
  },
  pathways: {
    backgroundColor: theme.palette.secondary.main,
  },
  ppi: {
    backgroundColor: theme.palette.secondary.light,
  },
  enzymeSubstrate: {
    backgroundColor: theme.palette.secondary.dark,
    color: 'white',
  },
});

const SourceChip = ({ classes, sourceType, label }) => (
  <Chip
    className={classNames(classes.chipSource, classes[sourceType])}
    label={label}
  />
);

export default withStyles(styles)(SourceChip);
