import React from 'react';
import {
  makeStyles,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';

const listComponetStyles = makeStyles(() => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Loader = ({ message = '' }) => (
  <Box
    my={20}
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <CircularProgress size={60} />
    <Box mt={6}>
      <Typography className={listComponetStyles.AccordionSubtitle}>
        {message}
      </Typography>
    </Box>
  </Box>
);

export default Loader;
