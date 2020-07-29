import React from 'react';
import { Checkbox, Typography } from '@material-ui/core';

const TopLevelControls = ({ indirects, onIndirectsChange }) => (
  <div
    style={{
      marginTop: '8px',
      marginBottom: '8px',
    }}
  >
    <Typography variant="subtitle2">
      <Checkbox
        checked={indirects}
        value={'useIndirects'}
        onChange={(event, value) => onIndirectsChange(value)}
        color="primary"
      />
      <span style={{ marginLeft: '6px', marginRight: '20px' }}>
        Use indirect evidence
      </span>
    </Typography>
  </div>
);

export default TopLevelControls;
