import React, { useState } from 'react';
import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
  LockOpen,
  LockRounded,
} from '@material-ui/icons';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';

import Link from '../Link';
import LongText from '../LongText';

const pmUrl = 'https://europepmc.org/';
const pmTitleUrl = 'abstract/med/';

const useStyles = makeStyles(theme => ({
  abstractSpan: {
    whiteSpace: 'normal',
  },
  detailsButton: {
    margin: '1rem',
    marginLeft: '0',
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

function PublicationWrapper({
  pmId,
  title,
  titleHtml,
  authors,
  journal,
  variant = 'regular',
  abstract,
  openAccess,
}) {
  const [showAbstract, setShowAbstract] = useState(false);

  const handleShowAbstractClick = () => {
    setShowAbstract(showAbstract => !showAbstract);
  };

  const classes = useStyles();

  return (
    <Box mb={4}>
      {/* paper title */}
      <Typography variant={variant === 'small' ? 'subtitle2' : 'subtitle1'}>
        <Link external to={pmUrl + pmTitleUrl + pmId}>
          {titleHtml ? (
            <span
              dangerouslySetInnerHTML={{ __html: titleHtml }}
              style={{ whiteSpace: 'normal' }}
            />
          ) : (
            title
          )}
        </Link>
      </Typography>

      {/* paper data */}
      {/* authors */}
      <Box style={{ whiteSpace: 'normal' }}>
        <LongText
          lineLimit={1}
          variant={variant === 'small' ? 'caption' : 'body2'}
        >
          {authors
            .map((author, i) => {
              return (
                author.lastName + (author.initials ? ' ' + author.initials : '')
              );
            })
            .join(', ')}
        </LongText>
      </Box>

      <Typography variant={variant === 'small' ? 'caption' : 'body2'}>
        {/* journal, year, reference */}
        {journal.title}{' '}
        <span>
          <b>
            {journal.dateOfPublication &&
              (journal.dateOfPublication.substring(0, 4) || '')}
          </b>
        </span>{' '}
        <span>{journal.volume || ''}</span>
        <span>({journal.issue || ''})</span>
        <span>:{journal.page || ''}</span>
      </Typography>
      <Button
        className={classes.detailsButton}
        variant="outlined"
        size="small"
        disabled={!abstract}
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

      <Button
        className={classes.detailsButton}
        size="small"
        startIcon={openAccess ? <LockOpen /> : <LockRounded />}
      >
        {openAccess ? 'Open access' : 'Locked access'}
      </Button>
      {showAbstract && (
        <Box className={classes.detailPanel}>
          <Typography variant="subtitle2">Abstract</Typography>
          <span className={classes.abstractSpan}>{abstract}</span>
        </Box>
      )}
    </Box>
  );
}

export default PublicationWrapper;
