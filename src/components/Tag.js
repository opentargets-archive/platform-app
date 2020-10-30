import React from 'react';
import { Chip, useTheme } from '@material-ui/core';

function Tag({ type }) {
  const theme = useTheme();
  const tagTypes = {
    new: { color: theme.palette.primary, label: 'New' },
    wip: { color: theme.palette.warning, label: 'WIP' },
  };

  if (!tagTypes[type]) {
    throw new Error(`Invalid tag, options are: ${Object.keys(tagTypes)}`);
  }

  return (
    <Chip
      size="small"
      label={tagTypes[type].label}
      style={{
        backgroundColor: tagTypes[type].color.main,
        color: tagTypes[type].color.contrastText,
        marginRight: '.5rem',
        fontWeight: 'bold',
      }}
    />
  );
}

export default Tag;
