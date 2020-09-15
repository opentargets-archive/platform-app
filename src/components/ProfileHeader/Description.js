import React from 'react';
import { Typography } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';

import LongText from '../LongText';

function Description({ children, loading = false }) {
  const loadingContent = <Skeleton count={3} />;
  const content = children ? (
    <LongText lineLimit={3}>{children}</LongText>
  ) : (
    'No description available'
  );

  return (
    <>
      <Typography variant="subtitle2">Description</Typography>
      {loading ? loadingContent : content}
    </>
  );
}

export default Description;
