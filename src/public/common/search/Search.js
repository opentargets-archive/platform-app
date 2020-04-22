import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import useDebounce from '../../../hooks/useDebounce';
import { client2 } from '../../client';
import { TextField, CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Search as SearchIcon, ArrowDropDown } from '@material-ui/icons';

function Search(props) {
  const SEARCH_QUERY = loader('./SearchQuery.gql');
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const debouncedInputValue = useDebounce(inputValue, 300);
  const [getData, { loading, data }] = useLazyQuery(SEARCH_QUERY, {
    variables: { queryString: debouncedInputValue },
    onCompleted: (data) => {},
    client: client2,
  });

  const handleChangeInputValue = (e) => {
    console.log('input value changed');
    setInputValue(e.target.value);
  };

  useEffect(() => {
    console.log('debouncedInputValue changed', debouncedInputValue);

    getData({ variables: { queryString: debouncedInputValue } });
  }, [debouncedInputValue, getData]);

  useEffect(() => {
    console.log('data changed', data);

    const res = [];

    if (data) {
      Object.keys(data).forEach((k) =>
        data[k].hits.map((i) => res.push(i.object))
      );
    }

    console.log('res', res);

    setSearchResults(res);
  }, [data]);

  console.log('searchResults', searchResults);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.id}
      options={searchResults}
      filterOptions={(o, s) => searchResults}
      loading={loading}
      debug
      popupIcon={open ? <ArrowDropDown /> : <SearchIcon />}
      renderOption={(o) => <span>{o.id}</span>}
      renderInput={(params) => (
        <TextField
          onChange={handleChangeInputValue}
          value={inputValue}
          {...params}
          label="Search for a target, disease, or drug..."
          InputProps={{
            ...params.InputProps,
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
