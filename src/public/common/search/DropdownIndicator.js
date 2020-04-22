import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';

const DropdownIndicator = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <SearchIcon color="inherit" />
    </Button>
  );
};

export default DropdownIndicator;
