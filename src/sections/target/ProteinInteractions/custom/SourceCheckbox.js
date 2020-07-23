import React from 'react';
import { Checkbox, withStyles } from '@material-ui/core/Checkbox';

const styles = theme => ({
  checked: {},
  pathways: {
    '&$checked': {
      color: theme.palette.secondary.main,
    },
  },
  ppi: {
    '&$checked': {
      color: theme.palette.secondary.light,
    },
  },
  enzymeSubstrate: {
    '&$checked': {
      color: theme.palette.secondary.dark,
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
