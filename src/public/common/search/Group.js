import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  groupHeading: {
    paddingBottom: '.25rem',
  },
  groupHeadingText: {
    padding: '0 .25rem',
    fontSize: '.75rem',
    color: theme.palette.secondary.main,
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },
}));

const Group = ({ children, name }) => {
  const classes = useStyles();

  const groupName = {
    topHit: 'Top Hit',
    disease: 'Disease',
    drug: 'Drug (Generic name)',
    target: 'Target',
  };

  return (
    <div className={classes.groupHeading}>
      {name !== 'any' && (
        <Typography className={classes.groupHeadingText} variant="body1">
          {groupName[name]}
        </Typography>
      )}
      {children}
    </div>
  );
};

export default Group;
