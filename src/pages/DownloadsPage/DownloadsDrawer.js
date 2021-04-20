import React, { useState } from 'react';
import { Drawer, Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  backdrop: {
    '& .MuiBackdrop-root': {
      opacity: '0 !important',
    },
  },
  container: {
    backgroundColor: theme.palette.grey[300],
  },
  title: {
    backgroundColor: 'white',
    borderBottom: '1px solid #ccc',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    padding: '1rem',
  },
  paper: {
    width: '420px',
    margin: '1.5rem',
    padding: '1rem',
  },
  resourceURL: {
    marginBottom: '8px',
    padding: '10px',
    wordBreak: 'break-all',
    backgroundColor: theme.palette.grey[800],
    color: 'white',
  },
}));

const ftpBase = 'ftp.ebi.ac.uk/pub/databases/opentargets/platform/';
const gcloudBase = 'gs://open-targets-data-releases/';

function DownloadsDrawer({ title, format, path, month, year, children }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  function close() {
    setOpen(false);
  }

  return (
    <>
      <span onClick={toggleOpen}>{children}</span>
      <Drawer
        classes={{ root: classes.backdrop, paper: classes.container }}
        open={open}
        onClose={close}
        anchor="right"
      >
        <Typography className={classes.title}>{title}</Typography>
        <Paper className={classes.paper} variant="outlined">
          <Typography variant="h6" gutterBottom>
            {format.toUpperCase()} Data Format
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            FTP
          </Typography>
          <div className={classes.resourceURL}>{`${ftpBase}${year}.${
            month < 10 ? '0' : ''
          }${month}/output/ETL${path}`}</div>
          <Typography variant="subtitle2" gutterBottom>
            Wget
          </Typography>
          <div className={classes.resourceURL}>{`wget ${ftpBase}${year}.${
            month < 10 ? '0' : ''
          }${month}/output/ETL${path}`}</div>
          <Typography variant="subtitle2" gutterBottom>
            Google Cloud
          </Typography>
          <div
            className={classes.resourceURL}
          >{`gsutil -m cp -r ${gcloudBase}${year}.${
            month < 10 ? '0' : ''
          }${month}/output/ETL${path}`}</div>
        </Paper>
      </Drawer>
    </>
  );
}

export default DownloadsDrawer;
