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

const useStyles = makeStyles((theme) => ({
  listbox: { maxHeight: 'fit-content', color: theme.palette.text.primary },
  option: { display: 'block', padding: '0 .5rem' },
}));

function Search() {
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

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectValue = (_, option) => {
    console.log('option', option);

    if (!option.type || option.type === 'search') {
      history.push(`/search?q=${option.name ? option.name : option}&page=1`);
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

    if (data) {
      // res.push({ type: 'search', entity: 'any', id: inputValue, name: inputValue });
      Object.keys(data).forEach((key) =>
        data[key].hits.map((i) =>
          res.push({
            type: key === 'topHit' ? 'topHit' : 'normal',
            entity: i.entity,
            ...i.object,
          })
        )
      );
    }
    setSearchResults(res);
  }, [data]);

  const classes = useStyles();

  return (
    <Autocomplete
      debug
      freeSolo
      classes={{ listbox: classes.listbox, option: classes.option }}
      filterOptions={(o, s) => searchResults}
      getOptionLabel={(option) => (option.id ? option.id : option)}
      groupBy={(option) =>
        option.type === 'topHit' ? 'topHit' : option.entity
      }
      loading={loading}
      openOnFocus={true}
      options={searchResults}
      onChange={handleSelectValue}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      open={open}
      popupIcon={open ? <ArrowDropDown /> : <SearchIcon />}
      renderOption={(option) => <Option data={option} />}
      renderGroup={(group) => (
        <Group key={group.key} name={group.group} children={group.children} />
      )}
      renderInput={(params) => (
        <TextField
          onChange={handleChangeInputValue}
          value={inputValue}
          {...params}
          label="Search for a target, disease, or drug..."
          InputProps={{
            ...params.InputProps,
            autoFocus: true,
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
    />
  );
}

export default Search;

// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { loader } from 'graphql.macro';
// import AsyncSelect from 'react-select/lib/Async';
// import Control from './Control';
// import Placeholder from './Placeholder';
// import DropdownIndicator from './DropdownIndicator';
// import GroupHeading from './GroupHeading';
// import Option from './Option';
// import ValueContainer from './ValueContainer';
// import { client2 } from '../../client.js';

// const SEARCH_QUERY = loader('./SearchQuery.gql');

// const groupOptions = (searchData, inputValue) => {
//   return [
//     {
//       value: inputValue,
//       entity: 'search',
//     },
//     {
//       label: 'Top Hit',
//       options: searchData.topHit.hits[0]
//         ? [
//             {
//               ...searchData.topHit.hits[0],
//               entity: 'topHit',
//             },
//           ]
//         : [],
//     },
//     {
//       label: 'Targets',
//       options: searchData.targets.hits,
//     },
//     {
//       label: 'Diseases',
//       options: searchData.diseases.hits,
//     },
//     {
//       label: 'Drugs (Generic Name)',
//       options: searchData.drugs.hits,
//     },
//   ];
// };

// const IndicatorSeparator = () => null;

// const customStyles = {
//   menuList: (base) => ({
//     ...base,
//     maxHeight: '500px',
//   }),
//   group: (base) => ({ ...base, padding: 0 }),
//   container: (base) => ({ ...base, minWidth: '450px' }),
// };

// const components = {
//   Option,
//   Control,
//   Placeholder,
//   DropdownIndicator,
//   GroupHeading,
//   IndicatorSeparator,
//   ValueContainer,
// };

// class Search extends Component {
//   loadOptions = (inputValue) => {
//     return client2
//       .query({
//         query: SEARCH_QUERY,
//         variables: { queryString: inputValue },
//       })
//       .then((res) => {
//         return groupOptions(res.data, inputValue);
//       });
//   };

//   handleOnChange = (data, { action }) => {
//     if (action === 'select-option') {
//       const { history } = this.props;

//       if (data.entity === 'search') {
//         history.push(`/search?q=${data.value}&page=1`);
//       } else if (data.entity === 'topHit') {
//         history.push(`/${data.object.__typename.toLowerCase()}/${data.id}`);
//       } else {
//         history.push(`/${data.entity}/${data.id}`);
//       }
//     }
//   };

//   render() {
//     return (
//       <AsyncSelect
//         cacheOptions
//         loadOptions={this.loadOptions}
//         onChange={this.handleOnChange}
//         components={components}
//         styles={customStyles}
//         theme={(theme) => ({
//           ...theme,
//           borderRadius: 0,
//         })}
//         placeholder="Search for a target, disease, or drug..."
//         openMenuOnClick={false}
//       />
//     );
//   }
// }

// export default withRouter(Search);
