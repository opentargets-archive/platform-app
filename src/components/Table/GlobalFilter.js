import React, { useEffect, useState } from 'react';
import { Grid, Input, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import useDebounce from '../../hooks/useDebounce';
import { globalSearchStyles } from './tableStyles';

function GlobalFilter({ onGlobalFilterChange }) {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 300);

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputClean = () => {
    setInputValue('');
  };

  useEffect(
    () => {
      onGlobalFilterChange(debouncedInputValue);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedInputValue]
  );

  const classes = globalSearchStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Input
          autoComplete="off"
          classes={{ root: classes.root }}
          startAdornment={<SearchIcon />}
          endAdornment={
            !!inputValue && (
              <IconButton onClick={handleInputClean}>
                <ClearIcon />
              </IconButton>
            )
          }
          placeholder="Search"
          label="Filter"
          onChange={handleInputChange}
          value={inputValue}
        />
      </Grid>
    </Grid>
  );
}

export default GlobalFilter;
