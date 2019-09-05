import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const styles = theme => ({
  label: {
    margin: 0,
    '& span:last-child': {
      fontSize: '0.75rem',
    },
  },
  radio: {
    width: '18px',
    height: '16px',
    '& svg': {
      fontSize: '16px',
    },
  },
});

const FacetRadio = ({ classes, ...rest }) => (
  <FormControlLabel
    className={classes.label}
    control={<Radio className={classes.radio} color="primary" />}
    {...rest}
  />
);

export default withStyles(styles)(FacetRadio);
