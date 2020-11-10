import React, { useState } from 'react';
import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from '@material-ui/icons';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';

import { naLabel } from '../../../constants';
import SentenceMatch from './SentenceMatch';
import SimplePublication from '../../common/Bibliography/SimplePublication';

const useStyles = makeStyles(theme => ({
  abstractSpan: {
    whiteSpace: 'normal',
  },
  detailsButton: {
    margin: '1rem',
  },
  detailPanel: {
    background: `${theme.palette.grey[100]}`,
    marginTop: '10px',
    padding: '20px',
  },
  matchTable: {
    width: '100%',
  },
}));

function Publication({
  europePmcId,
  title,
  abstract,
  textMiningSentences,
  authors,
  journal,
}) {
  const classes = useStyles();
  const [showAbstract, setShowAbstract] = useState(false);
  const [showMatches, setShowMatches] = useState(false);

  if (!title) {
    return <>{naLabel}</>;
  }

  const handleShowAbstractClick = () => {
    setShowAbstract(showAbstract => !showAbstract);
  };

  const handleShowMatchesClick = () => {
    setShowMatches(showMatches => !showMatches);
  };

  return (
    <Box>
      <SimplePublication
        pmId={europePmcId}
        titleHtml={title}
        authors={authors}
        journal={{
          title: journal.journal.title,
          date: journal.yearOfPublication.toString(),
          ref: {
            volume: journal.volume,
            issue: journal.issue,
            pgn: journal.page || naLabel,
          },
        }}
      />
      {abstract && (
        <Button
          className={classes.detailsButton}
          variant="outlined"
          size="small"
          startIcon={
            showAbstract ? (
              <RemoveCircleOutlineRounded />
            ) : (
              <AddCircleOutlineRounded />
            )
          }
          onClick={handleShowAbstractClick}
        >
          {showAbstract ? 'Hide abstract' : 'Show abstract'}
        </Button>
      )}
      {textMiningSentences && (
        <Button
          className={classes.detailsButton}
          variant="outlined"
          size="small"
          startIcon={
            showMatches ? (
              <RemoveCircleOutlineRounded />
            ) : (
              <AddCircleOutlineRounded />
            )
          }
          onClick={handleShowMatchesClick}
        >
          {showMatches
            ? 'Hide match details'
            : `Show ${textMiningSentences.length} match details`}
        </Button>
      )}
      {showAbstract && (
        <Box className={classes.detailPanel}>
          <Typography variant="subtitle2">Abstract</Typography>
          <span className={classes.abstractSpan}>{abstract}</span>
        </Box>
      )}
      {showMatches && (
        <Box className={classes.detailPanel}>
          <Typography variant="subtitle2">Matches</Typography>
          <table className={classes.matchTable}>
            <tbody>
              {textMiningSentences.map((match, index) => (
                <SentenceMatch key={index} match={match} />
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  );
}

export default Publication;
