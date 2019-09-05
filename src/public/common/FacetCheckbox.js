import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Grid from '@material-ui/core/Grid';

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
    paddingRight: '16px',
  },
  childrenContainerLabel: {
    fontSize: '0.75rem',
    padding: '4px 0',
  },
  expandButton: {
    width: '18px',
    height: '16px',
    '& svg': {
      fontSize: '16px',
    },
  },
  nested: {
    flexWrap: 'nowrap',
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
      <Grid
        className={classes.nested}
        container
        direction="row"
        justify="space-between"
      >
        <Grid item>
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
        </Grid>
        <Grid item>
          <IconButton className={classes.expandButton} aria-label="expand">
            <ExpandMoreIcon />
          </IconButton>
        </Grid>
      </Grid>
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
