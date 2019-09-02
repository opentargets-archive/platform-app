import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  label: {
    margin: 0,
    '& span:last-child': {
      fontSize: '0.75rem',
    },
  },
  checkbox: {
    width: '18px',
    height: '16px',
    '& svg': {
      fontSize: '16px',
    },
  },
});

const FacetCheckbox = ({ classes, label, value, checked, onChange }) => (
  <FormControlLabel
    className={classes.label}
    control={
      <Checkbox
        className={classes.checkbox}
        {...{ value, checked, onChange }}
      />
    }
    label={label}
  />
);

export default withStyles(styles)(FacetCheckbox);
