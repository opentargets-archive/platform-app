import React from 'react';
import Typography from '@material-ui/core/Typography';

const SideMenuItem = ({ name, hasData, onClick, inDragState }) => (
  <Typography
    style={{
      backgroundColor: inDragState ? '#ddd' : null,
      padding: 4,
      fontWeight: inDragState ? 'bold' : null,
    }}
    color={hasData ? 'primary' : 'lightgrey'}
    onClick={onClick}
  >
    {name}
  </Typography>
);

export default SideMenuItem;
