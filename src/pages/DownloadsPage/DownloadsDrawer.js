import React, { useState } from 'react';
import { Drawer, Typography, makeStyles } from '@material-ui/core';
import ReactJson from 'react-json-view';

const useStyles = makeStyles({
  backdrop: {
    '& .MuiBackdrop-root': {
      opacity: '0 !important',
    },
  },
});

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
        className={classes.backdrop}
        open={open}
        onClose={close}
        anchor="right"
      >
        <Typography>{title}</Typography>
        <Typography>Data</Typography>
        <Typography>Schema</Typography>
        <ReactJson src={JSON.parse(data.serialisedSchema)} />
      </Drawer>
    </>
  );
}

export default DownloadsDrawer;
