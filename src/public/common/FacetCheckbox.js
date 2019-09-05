import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
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
  childrenContainer: {
    marginLeft: '16px',
  },
  childrenContainerLabel: {
    fontSize: '0.75rem',
    padding: '4px 0',
  },
});

const FacetCheckbox = ({
  classes,
  children,
  label,
  value,
  checked,
  disabled = false,
  onChange,
  nested = false,
  noCheckbox = false,
}) =>
  noCheckbox ? (
    <React.Fragment>
      <FormLabel className={classes.childrenContainerLabel}>{label}</FormLabel>
      <FormGroup className={classes.childrenContainer}>{children}</FormGroup>
    </React.Fragment>
  ) : nested ? (
    <React.Fragment>
      <FormControlLabel
        className={classes.label}
        control={
          <Checkbox
            className={classes.checkbox}
            {...{ value, checked, disabled, onChange }}
          />
        }
        label={label}
      />
      <FormGroup className={classes.childrenContainer}>{children}</FormGroup>
    </React.Fragment>
  ) : (
    <FormControlLabel
      className={classes.label}
      control={
        <Checkbox
          className={classes.checkbox}
          {...{ value, checked, disabled, onChange }}
        />
      }
      label={label}
    />
  );

export default withStyles(styles)(FacetCheckbox);
