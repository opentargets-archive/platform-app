import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

const DropdownIndicator = ({ inputRef, innerProps }) => {
  return <SearchIcon ref={inputRef} {...innerProps} color="inherit" />;
};

export default DropdownIndicator;
