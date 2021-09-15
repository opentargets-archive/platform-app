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

import Link from '../../../components/Link';
import { identifiersOrgLink } from '../../../utils/global';
import MouseModelAllelicComposition from '../../../components/MouseModelAllelicComposition';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';

const useStyles = makeStyles(theme => ({
  drawerLink: {
    cursor: 'pointer',
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
}));

function AllelicCompositionDrawer({ biologicalModels }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  function close() {
    setOpen(false);
  }

  if (biologicalModels.length === 0) {
    return 'N/A';
  }

  if (biologicalModels.length === 1) {
    const {
      id,
      allelicComposition,
      geneticBackground,
      literature,
    } = biologicalModels[0];
    const entries = literature.map(lit => ({ name: lit }));
    return (
      <>
        <Link external to={`https://identifiers.org/${id}`}>
          <MouseModelAllelicComposition
            allelicComposition={allelicComposition}
            geneticBackground={geneticBackground}
          />
        </Link>
        <div>
          Publications: <PublicationsDrawer entries={entries} />
        </div>
      </>
    );
  }

  return (
    <>
      <MuiLink
        className={classes.drawerLink}
        onClick={toggleOpen}
        underline="none"
      >
        {biologicalModels.length} models
      </MuiLink>
      <Drawer
        classes={{ root: classes.backdrop, paper: classes.container }}
        open={open}
        onClose={close}
        anchor="right"
      >
        <Typography className={classes.title}>
          Experimental studies
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Typography>
        {biologicalModels.map((model, i) => {
          const {
            id,
            allelicComposition,
            geneticBackground,
            literature,
          } = model;
          const entries = literature.map(lit => ({ name: lit }));
          return (
            <Paper key={i} className={classes.paper} variant="outlined">
              <Link external to={`https://identifiers.org/${id}`}>
                <MouseModelAllelicComposition
                  allelicComposition={allelicComposition}
                  geneticBackground={geneticBackground}
                />
              </Link>
              <div>
                Publications: <PublicationsDrawer entries={entries} />
              </div>
            </Paper>
          );
        })}
      </Drawer>
    </>
  );
}

export default AllelicCompositionDrawer;
