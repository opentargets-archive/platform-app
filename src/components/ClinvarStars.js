import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

const useStyles = makeStyles(theme => ({
  star: {
    color: theme.palette.primary.main,
  },
}));

function ClinvarStars({ num }) {
  const classes = useStyles();

  const stars = [];
  for (let i = 0; i < 4; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        className={num > 0 ? classes.star : ''}
        icon={num > 0 ? faStarSolid : faStar}
      />
    );
    num--;
  }

  return stars;
}

export default ClinvarStars;
