import React, { useState } from 'react';
import {
  Drawer,
  Paper,
  Typography,
  Tab,
  Tabs,
  makeStyles,
} from '@material-ui/core';

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
    overflowWrap: 'break-word',
  },
}));

const ftpBase = 'ftp.ebi.ac.uk/pub/databases/opentargets/platform/';
const gcloudBase = 'gs://open-targets-data-releases/';

function DownloadsDrawer({ title, formats, month, year, children }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(formats[0].format);

  if (formats.length === 0) return null;

  function toggleOpen() {
    setOpen(!open);
  }

  function close() {
    setOpen(false);
  }

  function handleTabChange(_, tab) {
    console.log('tab', tab);
    setTab(tab);
  }

  const path = formats.find(format => format.format === tab).format;

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
          <Typography variant="h6">Data formats and access</Typography>
          <Tabs value="json" onChange={handleTabChange}>
            {formats.map(format => {
              return (
                <Tab
                  key={format.format}
                  value={format.format}
                  label={format.format}
                />
              );
            })}
          </Tabs>
          <Typography>FTP</Typography>
          <div className={classes.resourceURL}>{`${ftpBase}${year}.${
            month < 10 ? '0' : ''
          }${month}/output/ETL/${tab}`}</div>
          <Typography>Google Cloud</Typography>
          <div className={classes.resourceURL}>{`${gcloudBase}${year}.${
            month < 10 ? '0' : ''
          }${month}/output/ETL/${tab}`}</div>
        </Paper>
      </Drawer>
    </>
  );
}

export default DownloadsDrawer;
