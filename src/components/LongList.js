import React, { useState } from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    showMore: {
      whiteSpace: 'nowrap',
    },
    showMoreText: {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
  };
});

const LongList = ({ terms, render, maxTerms = 10 }) => {
  const [showMore, setShowMore] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setShowMore(!showMore);
  };

  if (terms.length === 0) return null;

  const shownTerms = terms.slice(0, maxTerms);
  const hiddenTerms = terms.slice(maxTerms);
  return (
    <>
      {shownTerms.map(render)}
      {showMore && hiddenTerms.map(render)}
      {hiddenTerms.length > 0 && (
        <Typography
          variant="body2"
          className={classes.showMore}
          onClick={handleClick}
        >
          {showMore ? '' : '... '}[
          <span className={classes.showMoreText}>
            {showMore ? ' hide ' : ' show more '}
          </span>
          ]
        </Typography>
      )}
    </>
  );
};

export default LongList;
