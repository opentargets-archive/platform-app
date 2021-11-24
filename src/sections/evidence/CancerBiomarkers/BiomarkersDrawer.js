import React, { Fragment, useState } from 'react';
import {
  Drawer,
  Link as MuiLink,
  IconButton,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import Tooltip from '../../../components/Tooltip';
import Link from '../../../components/Link';
import { sentenceCase } from '../../../utils/global';

const useStyles = makeStyles(theme => ({
  drawerLink: {
    cursor: 'pointer',
    display: 'inline-block',
    maxWidth: '420px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  backdrop: {
    '& .MuiBackdrop-root': {
      opacity: '0 !important',
    },
  },
  container: {
    backgroundColor: theme.palette.grey[300],
    display: 'unset',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottom: '1px solid #ccc',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    padding: '1rem',
  },
  paper: {
    width: '420px',
    margin: '1rem',
    padding: '1rem',
  },
  biomarkerItem: { marginBottom: '8px' },
}));

function BiomarkersDrawer({ biomarkerName, biomarkers }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  function close() {
    setOpen(false);
  }

  if (biomarkers.length === 0) {
    return 'N/A';
  }

  return (
    <>
      <Tooltip title={biomarkerName}>
        <MuiLink
          className={classes.drawerLink}
          onClick={toggleOpen}
          underline="none"
        >
          {biomarkerName}
        </MuiLink>
      </Tooltip>
      <Drawer
        classes={{ root: classes.backdrop, paper: classes.container }}
        open={open}
        onClose={close}
        anchor="right"
      >
        <Typography className={classes.title}>
          Biomarker
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Typography>
        {biomarkers.variant ? (
          <Paper className={classes.paper} variant="outlined">
            <Typography variant="subtitle2" paragraph>
              Variant:
            </Typography>
            {biomarkers.variant.map(variant => {
              return (
                <div key={variant.name} className={classes.biomarkerItem}>
                  <div>
                    {variant.name}{' '}
                    {variant.variantId ? `(ID: ${variant.variantId})` : null}
                  </div>
                  {variant.functionalConsequenceId ? (
                    <Link
                      external
                      to={`https://identifiers.org/${
                        variant.functionalConsequenceId.id
                      }`}
                    >
                      {sentenceCase(variant.functionalConsequenceId.label)}
                    </Link>
                  ) : null}
                </div>
              );
            })}
          </Paper>
        ) : null}
        {biomarkers.geneExpression ? (
          <Paper className={classes.paper} variant="outlined">
            <Typography variant="subtitle2" paragraph>
              Gene expression:
            </Typography>
            {biomarkers.geneExpression.map(expression => {
              return (
                <div key={expression.name} className={classes.biomarkerItem}>
                  <div>{expression.name}</div>
                  <Link
                    external
                    to={`https://identifiers.org/${expression.id.id}`}
                  >
                    {expression.id.name}
                  </Link>
                </div>
              );
            })}
          </Paper>
        ) : null}
      </Drawer>
    </>
  );
}

export default BiomarkersDrawer;
