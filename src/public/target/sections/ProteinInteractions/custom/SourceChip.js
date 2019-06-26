import React from 'react';
import classNames from 'classnames';
import { lighten } from 'polished';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

import { PALETTE } from 'ot-ui';

export const sourceTypeColors = {
  enzymeSubstrate: lighten(0.3, PALETTE.green),
  pathways: lighten(0.2, PALETTE.red),
  ppi: lighten(0.4, PALETTE.purple),
};

const styles = theme => ({
  chipSource: {
    margin: '1px',
    height: '24px',
    border: `1px solid ${theme.palette.grey[400]}`,
    // color: theme.// 'white',
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
