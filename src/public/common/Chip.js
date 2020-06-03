import React from 'react';
import MuiChip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  chip: {
    height: '20px',
    marginRight: '4px',
    marginBottom: '4px',
    maxWidth: '100%',
  },
});

const Chip = ({ label, title }) => {
  const classes = useStyles();
  return (
    <MuiChip
      className={classes.chip}
      label={label}
      title={title}
      variant="outlined"
      size="small"
    />
  );
};

export default Chip;
