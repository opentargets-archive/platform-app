import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import withStyles from '@material-ui/core/styles/withStyles';

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
