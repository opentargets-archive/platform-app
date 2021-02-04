import React from 'react';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

function Field({ title, loading, children }) {
  if (loading) return <Skeleton />;

  if (!children || (Array.isArray(children) && children.length === 0)) {
    return null;
  }

  return (
    <Typography variant="subtitle2">
      {title}:{' '}
      <Typography display="inline" variant="body2">
        {children}
      </Typography>
    </Typography>
  );
}

export default Field;
