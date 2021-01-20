import React from 'react';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

function Field({ title, loading, children }) {
  return (
    <Typography variant="subtitle2">
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {title}:{' '}
          <Typography display="inline" variant="body2">
            {children}
          </Typography>
        </>
      )}
    </Typography>
  );
}

export default Field;
