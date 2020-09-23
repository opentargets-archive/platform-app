import React from 'react';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import LongText from '../LongText';

function Description({ children, loading = false }) {
  const content = children ? (
    <LongText lineLimit={3}>{children}</LongText>
  ) : (
    'No description available'
  );

  return (
    <>
      <Typography variant="subtitle2">Description</Typography>
      {loading ? <Skeleton /> : content}
    </>
  );
}

export default Description;
