import React, { useState } from 'react';
import { Drawer, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  backdrop: {
    '& .MuiBackdrop-root': {
      opacity: '0 !important',
    },
  },
});

function DownloadsDrawer({ children, data }) {
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
        downloads drawer
        <pre>{JSON.stringify(schema, undefined, 2)}</pre>
      </Drawer>
    </>
  );
}

export default DownloadsDrawer;
