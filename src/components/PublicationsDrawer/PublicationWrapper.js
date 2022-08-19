import React, { useState, useEffect } from 'react';
import {
  faPlusCircle,
  faMinusCircle,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  fileLabel: {
    color: '#5a5f5f',
    fontSize: '0.875rem',
    fontFamily: '"Inter", "sans-serif"',
    fontWeight: '500',
  },
}));

function PublicationWrapper({
  europePmcId,
  title,
  titleHtml,
  authors,
  journal,
  variant = 'regular',
  abstract,
  fullTextOpen,
}) {
  const [showAbstract, setShowAbstract] = useState(false);

  const handleShowAbstractClick = () => {
    setShowAbstract(showAbstract => !showAbstract);
  };

  useEffect(
    () => {
      setShowAbstract(false);
    },
    [europePmcId]
  );

  const classes = useStyles();

  return (
    <Box mb={2}>
      {/* paper title */}
      <Box style={{ whiteSpace: 'normal' }}>
        <Typography variant={variant === 'small' ? 'subtitle2' : 'subtitle1'}>
          <Link external to={pmUrl + pmTitleUrl + europePmcId}>
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
      </Box>

      <Box style={{ whiteSpace: 'normal' }}>
        <LongText
          lineLimit={1}
          variant={variant === 'small' ? 'caption' : 'body2'}
        >
          {authors
            .reduce((acc, author) => {
              if (author.lastName)
                acc.push(
                  author.lastName +
                    (author.initials ? ' ' + author.initials : '')
                );
              return acc;
            }, [])
            .join(', ')}
        </LongText>
      </Box>

      <Box style={{ whiteSpace: 'normal' }}>
        <Typography variant={variant === 'small' ? 'caption' : 'body2'}>
          {/* journal, year, reference */}
          {journal.journal?.title || ''}{' '}
          <span>
            <b>
              {journal.dateOfPublication &&
                (journal.dateOfPublication.substring(0, 4) || '')}
            </b>
          </span>{' '}
          <span>{journal.volume || ''}</span>
          <span>{journal.issue && `(${journal.issue})`}</span>
          <span>{journal.page && `:${journal.page}`}</span>
        </Typography>
      </Box>

      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          className={classes.detailsButton}
          variant="outlined"
          size="small"
          disabled={!abstract}
          onClick={handleShowAbstractClick}
          startIcon={
            showAbstract ? (
              <FontAwesomeIcon icon={faMinusCircle} size="sm" />
            ) : (
              <FontAwesomeIcon icon={faPlusCircle} size="sm" />
            )
          }
        >
          {showAbstract ? 'Hide abstract' : 'Show abstract'}
        </Button>
        {fullTextOpen && (
          <label className={classes.fileLabel}>
            <FontAwesomeIcon
              icon={faFileAlt}
              style={{ marginRight: '8px' }}
              size="lg"
            />
            Full text available
          </label>
        )}
      </Box>

      {showAbstract && (
        <Box className={classes.detailPanel}>
          <Typography variant="subtitle2">Abstract</Typography>
          <span
            className={classes.abstractSpan}
            dangerouslySetInnerHTML={{ __html: abstract }}
          />
        </Box>
      )}
    </Box>
  );
}

export default PublicationWrapper;
