import React from 'react';
import Typography from '@material-ui/core/Typography';

const SideMenuItem = ({ name, disabled, onClick, inDragState }) => (
  <Typography
    style={{
      backgroundColor: inDragState ? '#ddd' : null,
      padding: 4,
      fontWeight: inDragState ? 'bold' : null,
    }}
    color="primary"
    onClick={onClick}
  >
    {name}
  </Typography>
);

export default SideMenuItem;
