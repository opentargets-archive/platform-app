import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

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
  if (highlights.length === 0) return null;

  const [showMore, setShowMore] = useState(false);
  return (
    <div className={classes.matches}>
      <Typography component="span" inline variant="subtitle2">
        Matches:
      </Typography>{' '}
      <Typography
        inline
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
          <Typography inline>
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
