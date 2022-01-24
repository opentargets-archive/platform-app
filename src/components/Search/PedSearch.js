import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  Box,
  CircularProgress,
  Input,
  InputBase,
  makeStyles,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Search as SearchIcon, ArrowDropDown } from '@material-ui/icons';

import useDebounce from '../../hooks/useDebounce';
import Option from './Option';
import Group from './Group';


const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },
  containerEmbedded: {
    minWidth: '447px',
    [theme.breakpoints.only('sm')]: { minWidth: '48%' },
    [theme.breakpoints.only('xs')]: { display: 'none' },
  },
  input: {
    width: '100%',
    //paddingRight: '60px',
  },
  inputBase: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
    width: '100%',
  },
  inputBaseInput: { padding: '.25rem0- .5rem' },
  listbox: { maxHeight: 'fit-content', color: theme.palette.text.primary },
  option: { display: 'block', padding: '0 .5rem' },
  root: {
    width: '100%',
  },
}));

function PedSearch({ autoFocus = false, embedded = false, inputValue='', setInputValue, searchQuery }) {
  const [open, setOpen] = React.useState(false);
  const debouncedInputValue = useDebounce(inputValue, 300);
  const [getData, { loading, data }] = useLazyQuery(searchQuery, {
    variables: { queryString: debouncedInputValue },
    onCompleted: () => {},
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleChangeInputValue = e => {
    if (!e.target.value) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    setInputValue(e.target.value || '');
  };

  const handleSelectOption = (e, option, r) => {
    handleChangeInputValue(e);

    if (!option) return;

    if (option.type === 'search') {
      setInputValue(option.name || '')
    } else {
      option.entity === "target" ? setInputValue(option.approvedSymbol || '') : setInputValue(option.name || '')
    }
  };

  const getOptionVal = (option, defualtReturn) =>{
    let result = defualtReturn
    
    if (option.entity === "target") {
      result = option.approvedSymbol.toLowerCase()
    } else if (option.entity === "disease") {
      result = option.name.toLowerCase()
    } 

    return result;
  }

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

  const classes = useStyles();

  return (
    <Box className={!embedded ? classes.container : classes.containerEmbedded}>
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
        getOptionLabel={option => getOptionVal(option, option)}
        getOptionSelected={(option, value) => getOptionVal(option, option.id).toLowerCase() === value.toLowerCase()}
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
        renderOption={option => <Option data={option} setInputValue={setInputValue} />}
        renderGroup={group => (
          <Group key={group.key} name={group.group} children={group.children} />
        )}
        renderInput={params =>
          !embedded ? (
            <Input
            style={{paddingLeft: '5px'}}
              className={classes.input}
              inputProps={params.inputProps}
              ref={params.InputProps.ref}
              endAdornment={
                loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  params.InputProps.endAdornment.props.children[0]
                )
              }
              placeholder=" Search ..."
              onChange={handleChangeInputValue}
              value={inputValue}
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
              placeholder="Search..."
              onChange={handleChangeInputValue}
              value={inputValue}
            />
          )
        }
        value={inputValue}
      />
    </Box>)

}

export default PedSearch;
