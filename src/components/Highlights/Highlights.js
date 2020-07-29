import React, { useState } from 'react';
import { Typography, withStyles } from '@material-ui/core';

const highlightStyles = theme => ({
  showMore: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
  matches: {
    marginTop: '4px',
  },
});

const Highlights = ({ classes, highlights }) => {
  const [showMore, setShowMore] = useState(false);

  if (highlights.length === 0) return null;

  return (
    <div className={classes.matches}>
      <Typography component="span" display="inline" variant="subtitle2">
        Matches:
      </Typography>{' '}
      <Typography
        display="inline"
        variant="caption"
        className="highlights"
        dangerouslySetInnerHTML={{
          __html: showMore
            ? highlights.join('<span class="separator"> | </span>')
            : highlights[0],
        }}
      />
      {highlights.length > 1 && (
        <>
          {' '}
          <Typography variant="body2" display="inline">
            [{' '}
            <span
              className={classes.showMore}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'hide' : 'more'}
            </span>{' '}
            ]
          </Typography>
        </>
      )}
    </div>
  );
};

export default withStyles(highlightStyles)(Highlights);
