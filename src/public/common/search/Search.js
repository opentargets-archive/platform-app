import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { TextField, CircularProgress, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Search as SearchIcon, ArrowDropDown } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import { client2 } from '../../client';
import useDebounce from '../../../hooks/useDebounce';
import Option from './Option';
import Group from './Group';

const useStyles = makeStyles(theme => ({
  listbox: { maxHeight: 'fit-content', color: theme.palette.text.primary },
  option: { display: 'block', padding: '0 .5rem' },
}));

function Search({ autoFocus = false, embedded = false }) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 300);
  const SEARCH_QUERY = loader('./SearchQuery.gql');
  const [getData, { loading, data }] = useLazyQuery(SEARCH_QUERY, {
    variables: { queryString: debouncedInputValue },
    onCompleted: () => {},
    client: client2,
  });
  const [searchResults, setSearchResults] = useState([]);
  let history = useHistory();

  const handleChangeInputValue = e => {
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

  useEffect(() => {
    if (debouncedInputValue) {
      getData({ variables: { queryString: debouncedInputValue } });
    } else {
      setSearchResults([]);
    }
  }, [debouncedInputValue, getData]);

  useEffect(() => {
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
  }, [data, inputValue]);

  const classes = useStyles();

  return (
    <Autocomplete
      autoHighlight
      freeSolo
      forcePopupIcon
      disablePortal
      clearOnEscape={false}
      classes={{ listbox: classes.listbox, option: classes.option }}
      filterOptions={(o, s) => searchResults}
      getOptionLabel={option => (option.id ? option.id : option)}
      getOptionSelected={(option, value) => option.id === value}
      groupBy={option => (option.type === 'topHit' ? 'topHit' : option.entity)}
      loading={loading}
      noOptionsText="No results"
      options={searchResults}
      onChange={handleSelectOption}
      onOpen={() => {
        setOpen(true);
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
      renderInput={params => (
        <TextField
          onChange={handleChangeInputValue}
          value={inputValue}
          {...params}
          label="Search for a target, disease, or drug..."
          InputProps={{
            ...params.InputProps,
            autoFocus: autoFocus,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      value={inputValue}
    />
  );
}

export default Search;
