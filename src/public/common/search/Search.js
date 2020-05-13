import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import {
  CircularProgress,
  makeStyles,
  InputBase,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Search as SearchIcon, ArrowDropDown } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import useDebounce from '../../../hooks/useDebounce';
import Option from './Option';
import Group from './Group';

const SEARCH_QUERY = loader('./SearchQuery.gql');

const useStyles = makeStyles(theme => ({
  listbox: { maxHeight: 'fit-content', color: theme.palette.text.primary },
  option: { display: 'block', padding: '0 .5rem' },
  inputBase: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
    width: '100%',
  },
  inputBaseInput: { padding: '.25rem .5rem' },
  root: embedded => ({ minWidth: '400px' }),
}));

function Search({ autoFocus = false, embedded = false }) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 300);
  const [getData, { loading, data }] = useLazyQuery(SEARCH_QUERY, {
    variables: { queryString: debouncedInputValue },
    onCompleted: () => {},
  });
  const [searchResults, setSearchResults] = useState([]);
  let history = useHistory();

  const handleChangeInputValue = e => {
    if (!e.target.value) setOpen(false);
    setInputValue(e.target.value || '');
  };

  const handleSelectOption = (e, option, r) => {
    handleChangeInputValue(e);

    if (!option) return;

    if (option.type === 'search') {
      history.push(`/search?q=${option.name}&page=1`);
    } else {
      history.push(`/${option.entity}/${option.id}`);
    }
  };

  useEffect(
    () => {
      if (debouncedInputValue) {
        getData({ variables: { queryString: debouncedInputValue } });
      } else {
        setSearchResults([]);
      }
    },
    [debouncedInputValue, getData]
  );

  useEffect(
    () => {
      const res = [];

      if (inputValue) {
        res.push({
          type: 'search',
          entity: 'any',
          id: inputValue,
          name: inputValue,
        });
      }

      if (data) {
        Object.keys(data).forEach(key =>
          data[key].hits.map(i =>
            res.push({
              type: key === 'topHit' ? 'topHit' : 'normal',
              entity: i.entity,
              ...i.object,
            })
          )
        );
      }
      setSearchResults(res);
    },
    [data, inputValue]
  );

  const classes = useStyles(embedded);

  return (
    <div>
      <Autocomplete
        autoHighlight
        freeSolo
        forcePopupIcon
        disablePortal
        clearOnEscape={false}
        classes={{
          listbox: classes.listbox,
          option: classes.option,
          root: classes.root,
        }}
        filterOptions={(o, s) => searchResults}
        getOptionLabel={option => (option.id ? option.id : option)}
        getOptionSelected={(option, value) => option.id === value}
        groupBy={option =>
          option.type === 'topHit' ? 'topHit' : option.entity
        }
        loading={loading}
        noOptionsText="No results"
        options={searchResults}
        onChange={handleSelectOption}
        onOpen={() => {
          if (inputValue) setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        popupIcon={open ? <ArrowDropDown /> : <SearchIcon />}
        renderOption={option => <Option data={option} />}
        renderGroup={group => (
          <Group key={group.key} name={group.group} children={group.children} />
        )}
        renderInput={params =>
          !embedded ? (
            <TextField
              InputProps={{
                ...params.InputProps,
                autoFocus: autoFocus,
                endAdornment: loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  params.InputProps.endAdornment
                ),
              }}
              label="Search for a target, disease, or drug..."
              onChange={handleChangeInputValue}
              value={inputValue}
              {...params}
            />
          ) : (
            <InputBase
              autoFocus={autoFocus}
              classes={{
                root: classes.inputBase,
                input: classes.inputBaseInput,
              }}
              inputProps={params.inputProps}
              ref={params.InputProps.ref}
              endAdornment={
                loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  params.InputProps.endAdornment
                )
              }
              placeholder="Search for a target, disease, or drug..."
              onChange={handleChangeInputValue}
              value={inputValue}
            />
          )
        }
        value={inputValue}
      />
    </div>
  );
}

export default Search;
