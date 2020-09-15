import React from 'react';

import { Typography } from '@material-ui/core';

function SectionError(error) {
  return (
    <Typography color="error" align="center">
      {error.message}
    </Typography>
  );
}

export default SectionError;
