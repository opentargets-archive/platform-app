import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import Chip from '../Chip';
import LongList from '../LongList';

function Synonyms({ children, loading = false }) {
  const loadingContent = <Skeleton count={1} />;
  const content = children ? (
    <LongList
      terms={children}
      maxTerms={10}
      render={synonym => <Chip key={synonym} label={synonym} title={synonym} />}
      size="small"
    />
  ) : (
    'No synonyms'
  );

  return (
    <>
      <Typography variant="subtitle2">Synonyms</Typography>
      {loading ? loadingContent : content}
    </>
  );
}

export default Synonyms;
