import React from 'react';
import { Chip as MUIChip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  chip: {
    height: '20px',
    marginRight: '4px',
    marginBottom: '4px',
    maxWidth: '100%',
  },
});

const Chip = ({ label, title, disabled }) => {
  const classes = useStyles();
  return (
    <MUIChip
      className={classes.chip}
      label={label}
      title={title}
      variant="outlined"
      size="small"
      disabled={disabled}
    />
  );
};

export default Chip;
