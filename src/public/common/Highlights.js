import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const highlightStyles = theme => ({
  showMore: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
  matches: {
    marginTop: '9px',
  },
});

const Highlights2 = ({ classes, highlights }) => {
  if (highlights.length === 0) return null;

  const [showMore, setShowMore] = useState(false);
  return (
    <div className={classes.matches}>
      <Typography component="span" inline variant="subtitle2">
        Matches:
      </Typography>{' '}
      {(showMore ? highlights : [highlights[0]]).map((highlight, i) => {
        return (
          <Typography
            key={i}
            className="highlights"
            dangerouslySetInnerHTML={{
              __html: highlight,
            }}
          />
        );
      })}
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
        className="highlights"
        dangerouslySetInnerHTML={{
          __html: showMore ? highlights.join('; ') : highlights[0],
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

// export default withStyles(highlightStyles)(Highlights);
export default withStyles(highlightStyles)(Highlights2);
