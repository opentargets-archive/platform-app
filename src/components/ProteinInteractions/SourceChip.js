import React from 'react';
import classNames from 'classnames';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

import { PALETTE } from 'ot-ui';

export const sourceTypeColors = {
  enzymeSubstrate: PALETTE.red,
  pathways: PALETTE.green,
  ppi: PALETTE.purple,
};

const styles = theme => ({
  chipSource: {
    margin: '1px',
    height: '24px',
    color: 'white',
  },
  pathways: {
    backgroundColor: sourceTypeColors.pathways,
  },
  ppi: {
    backgroundColor: sourceTypeColors.ppi,
  },
  enzymeSubstrate: {
    backgroundColor: sourceTypeColors.enzymeSubstrate,
  },
});

const SourceChip = ({ classes, sourceType, label }) => (
  <Chip
    className={classNames(classes.chipSource, classes[sourceType])}
    label={label}
    color={sourceTypeColors[sourceType]}
  />
);

export default withStyles(styles)(SourceChip);
