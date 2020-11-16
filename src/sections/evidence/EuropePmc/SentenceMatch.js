import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  matchInnerContainer: {
    background: `${theme.palette.grey[200]}`,
    marginLeft: '.5rem',
    padding: '.5rem',
    whiteSpace: 'normal',
  },
  matchOuterContainer: {
    alignItems: 'center',
    display: 'flex',
  },
  diseaseMark: {
    backgroundColor: theme.palette.secondary.light,
  },
  targetMark: {
    backgroundColor: theme.palette.primary.light,
  },
}));

function SentenceMatch({ match }) {
  const classes = useStyles();
  const breaks = [
    match.dStart,
    match.dEnd + 1,
    match.tStart,
    match.tEnd + 1,
  ].sort((a, b) => a - b);

  const whichMatch = index => {
    if (index === match.dStart) return classes.diseaseMark;
    if (index === match.tStart) return classes.targetMark;

    return null;
  };

  return (
    <tr>
      <td>
        <Typography variant="subtitle2">In: {match.section}</Typography>
      </td>
      <td>
        <Box className={classes.matchInnerContainer}>
          {match.text.slice(0, breaks[0])}
          <mark className={whichMatch(breaks[0])}>
            {match.text.slice(breaks[0], breaks[1])}
          </mark>
          {match.text.slice(breaks[1], breaks[2])}
          <mark className={whichMatch(breaks[2])}>
            {match.text.slice(breaks[2], breaks[3])}
          </mark>
          {match.text.slice(breaks[3])}
        </Box>
      </td>
    </tr>
  );
}

export default SentenceMatch;
