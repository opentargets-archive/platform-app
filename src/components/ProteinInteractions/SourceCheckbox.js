import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/core/styles/withStyles';

import { sourceTypeColors } from './SourceChip';

const styles = theme => ({
  checked: {},
  pathways: {
    '&$checked': {
      color: sourceTypeColors.pathways,
    },
  },
  ppi: {
    '&$checked': {
      color: sourceTypeColors.ppi,
    },
  },
  enzymeSubstrate: {
    '&$checked': {
      color: sourceTypeColors.enzymeSubstrate,
    },
  },
});

const SourceCheckbox = ({ classes, sourceType, ...rest }) => (
  <Checkbox
    classes={{
      root: classes[sourceType],
      checked: classes.checked,
    }}
    {...rest}
  />
);

export default withStyles(styles)(SourceCheckbox);
