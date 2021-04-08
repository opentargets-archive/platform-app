import React, { useState } from 'react';
import FileSaver from 'file-saver';
import { Drawer, Box, Typography, Button, makeStyles } from '@material-ui/core';
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

  function downloadSchema() {
    const blob = new Blob([JSON.stringify(schema)], {
      type: 'application/json;charset=utf-8',
    });
    FileSaver.saveAs(blob, 'schema.json', { autoBOM: false });
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
        <Box m={2} width={400}>
          <Typography>Data</Typography>
          <Typography>Schema</Typography>
          <Button variant="outlined" size="small" onClick={downloadSchema}>
            Download schema (JSON)
          </Button>
          <ReactJson src={schema} enableClipboard={false} name={false} />
        </Box>
      </Drawer>
    </>
  );
}

export default DownloadsDrawer;
