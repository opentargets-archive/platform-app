import React from 'react';
import Typography from '@material-ui/core/Typography';

const SideMenuItem = ({ name, disabled, onClick }) => (
  <Typography style={{ padding: 4 }} onClick={onClick}>
    {name}
  </Typography>
);

export default SideMenuItem;
