import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  chip: {
    margin: '2px 2px',
  },
});

const Synonyms = ({ synonyms, classes }) => {
  return (
    <Fragment>
      <Typography variant="subtitle2">Synonyms</Typography>
      {synonyms.map(synonym => (
        <Chip
          className={classes.chip}
          key={synonym}
          label={synonym}
          variant="outlined"
        />
      ))}
    </Fragment>
  );
};

export default withStyles(styles)(Synonyms);
