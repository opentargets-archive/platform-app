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

class FacetCheckbox extends React.Component {
  state = {
    expanded: false,
  };
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    const {
      classes,
      children,
      label,
      value,
      checked,
      disabled = false,
      onChange,
      nested = false,
      noCheckbox = false,
      alwaysExpanded = false,
      indeterminate = false,
    } = this.props;
    const { expanded } = this.state;

    // create basic checkbox control
    let control;
    if (noCheckbox) {
      control = (
        <FormLabel className={classes.childrenContainerLabel}>
          {label}
        </FormLabel>
      );
    } else {
      control = (
        <FormControlLabel
          className={classes.label}
          control={
            <Checkbox
              className={classes.checkbox}
              {...{ value, checked, disabled, indeterminate, onChange }}
            />
          }
          label={label}
        />
      );
    }

    // handle nesting
    if (nested && alwaysExpanded) {
      return (
        <React.Fragment>
          {control}
          <FormGroup className={classes.childrenContainer}>
            {children}
          </FormGroup>
        </React.Fragment>
      );
    } else if (nested && !alwaysExpanded) {
      return (
        <React.Fragment>
          <Grid
            className={classes.nested}
            container
            direction="row"
            justify="space-between"
          >
            <Grid item>{control}</Grid>
            <Grid item>
              <IconButton
                onClick={this.handleExpandClick}
                className={classes.expandButton}
                aria-label="expand"
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Grid>
          </Grid>
          {expanded ? (
            <FormGroup className={classes.childrenContainer}>
              {children}
            </FormGroup>
          ) : null}
        </React.Fragment>
      );
    } else {
      return control;
    }
  }
}

export default withStyles(styles)(FacetCheckbox);
