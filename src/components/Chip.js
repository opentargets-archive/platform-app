import React from 'react';
import classNames from 'classnames';
import { Chip as MUIChip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  chip: {
    height: '20px',
    marginRight: '4px',
    marginBottom: '4px',
    maxWidth: '100%',
  },
});

const Chip = ({ className, label, title, disabled }) => {
  const classes = useStyles();
  return (
    <MUIChip
      className={classNames(classes.chip, className)}
      label={label}
      title={title}
      variant="outlined"
      size="small"
      disabled={disabled}
    />
  );
};

export default Chip;
