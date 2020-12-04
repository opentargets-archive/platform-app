import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  star: {
    color: theme.palette.primary.main,
  },
}));

function ClinvarStar() {
  const classes = useStyles();
  return <FontAwesomeIcon className={classes.star} icon={faStar} size="sm" />;
}

export default ClinvarStar;
