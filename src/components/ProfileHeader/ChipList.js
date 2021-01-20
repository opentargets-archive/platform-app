import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { Box, Typography } from '@material-ui/core';

import Chip from '../Chip';
import LongList from '../LongList';

function ChipList({ children, title, loading = false, inline }) {
  if (inline && loading) return <Skeleton count={1} />;

  if (!children || children.length === 0) return null;

  return (
    <Box>
      <Typography variant="subtitle2" display={inline ? 'inline' : 'initial'}>
        {title}
        {inline ? ': ' : ''}
      </Typography>
      {loading ? (
        <Skeleton count={1} />
      ) : (
        <LongList
          terms={children}
          maxTerms={10}
          render={item => <Chip key={item} label={item} title={item} />}
          size="small"
        />
      )}
    </Box>
  );
}

export default ChipList;
