import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  chip: {
    margin: '2px 2px',
    height: '20px',
  },
});

const ChipsField = ({ label, terms, classes }) => {
  if (terms.length === 0) return null;

  return (
    <Fragment>
      <Typography variant="subtitle2">{label}:</Typography>
      {terms.map(term => (
        <Chip
          className={classes.chip}
          key={term}
          label={term}
          variant="outlined"
        />
      ))}
    </Fragment>
  );
};

export default withStyles(styles)(ChipsField);
