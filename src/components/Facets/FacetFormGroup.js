import React from 'react';
import { FormControl, FormGroup, withStyles } from '@material-ui/core';

const styles = () => ({
  formControl: {
    width: '100%',
  },
});

const FacetFormGroup = ({ classes, children }) => (
  <FormControl className={classes.formControl} component="fieldset">
    <FormGroup>{children}</FormGroup>
  </FormControl>
);

export default withStyles(styles)(FacetFormGroup);
