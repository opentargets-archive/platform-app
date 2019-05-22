import React from 'react';
import Typography from '@material-ui/core/Typography';

const SideMenuItem = ({ name, disabled }) => (
  <Typography style={{ padding: 4 }}>{name}</Typography>
);

export default SideMenuItem;
