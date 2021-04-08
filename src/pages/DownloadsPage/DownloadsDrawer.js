import React, { useState } from 'react';
import { Drawer, Box, Typography, makeStyles } from '@material-ui/core';
import ReactJson from 'react-json-view';

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
}));

function DownloadsDrawer({ title, data, children }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  function close() {
    setOpen(false);
  }

  const schema = JSON.parse(data.serialisedSchema);

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
        <Box p={2} width={400}>
          <Typography>Data</Typography>
          <Typography>Schema</Typography>
          <ReactJson src={schema} enableClipboard={false} />
        </Box>
      </Drawer>
    </>
  );
}

export default DownloadsDrawer;
