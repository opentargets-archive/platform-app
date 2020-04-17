import React, { useState } from 'react';
import Clampy from '@clampy-js/react-clampy';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  showMore: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
});

const LongText = ({ classes, children, lineLimit }) => {
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Typography component="div">
        <Clampy clampSize={showMore ? null : lineLimit}>{children}</Clampy>
      </Typography>
      <Typography component="div" onClick={handleClick}>
        [{' '}
        <span className={classes.showMore}>
          {showMore ? 'hide' : 'show more'}
        </span>{' '}
        ]
      </Typography>
    </>
  );
};

export default withStyles(styles)(LongText);
