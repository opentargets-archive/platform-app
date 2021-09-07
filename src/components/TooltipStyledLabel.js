import React from 'react';
import { Typography } from '@material-ui/core';

/**
 * Styled label for use in the tooltip for consistent look'n'feel.
 * The format is:
 * <bold>label:</bold> description
 * the description can be on a new line (default is on same line)
 */
function TooltipStyledLabel({ label, description, newline = false }) {
  return (
    <Typography variant="body2">
      <span style={{ fontWeight: 'bold' }}>{label}:</span>{' '}
      {newline ? <br /> : null}
      {description}
    </Typography>
  );
}

export default TooltipStyledLabel;
