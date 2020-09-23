import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { Box, Typography } from '@material-ui/core';

import Chip from '../Chip';
import LongList from '../LongList';

function ChipList({ children, title, loading = false, inline }) {
  const loadingContent = <Skeleton count={1} />;
  const content = children ? (
    <LongList
      terms={children}
      maxTerms={10}
      render={item => <Chip key={item} label={item} title={item} />}
      size="small"
    />
  ) : (
    `No ${title.toLowerCase()}.`
  );

  return (
    <Box>
      <Typography variant="subtitle2" display={inline ? 'inline' : 'initial'}>
        {title}
        {inline ? ': ' : ''}
      </Typography>
      {loading ? loadingContent : content}
    </Box>
  );
}

export default ChipList;
