import React, { useState, useLayoutEffect, useRef } from 'react';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  showMore: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
});

const LongText = ({ classes, lineLimit, children, variant = 'body2' }) => {
  const containerRef = useRef();
  const textRef = useRef();
  const [showMore, setShowMore] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState();

  useLayoutEffect(
    () => {
      const container = containerRef.current;
      const el = textRef.current;
      const height = el.offsetHeight;
      const lineHeight = Number.parseInt(
        document.defaultView
          .getComputedStyle(el, null)
          .getPropertyValue('line-height'),
        10
      );
      const numberOfLines = Math.round(height / lineHeight);

      container.style.height =
        numberOfLines <= lineLimit
          ? 'auto'
          : showMore
          ? 'auto'
          : `${lineLimit * lineHeight}px`;

      setNumberOfLines(numberOfLines);
    },
    [lineLimit, showMore, children]
  );

  return (
    <Typography variant={variant}>
      <span ref={containerRef} className={classes.textContainer}>
        <span ref={textRef}>{children}</span>
      </span>
      {numberOfLines > lineLimit && (
        <span>
          {showMore ? '' : '... '}[{' '}
          <span
            className={classes.showMore}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? ' hide' : ' show more'}
          </span>{' '}
          ]
        </span>
      )}
    </Typography>
  );
};

export default withStyles(styles)(LongText);
