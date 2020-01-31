import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { loader } from 'graphql.macro';
import AsyncSelect from 'react-select/lib/Async';
import Control from './Control';
import Placeholder from './Placeholder';
import DropdownIndicator from './DropdownIndicator';
import GroupHeading from './GroupHeading';
import Option from './Option';
import ValueContainer from './ValueContainer';
import { client2 } from '../../App.js';

const SEARCH_QUERY = loader('./SearchQuery.gql');

const groupOptions = (searchData, inputValue) => {
  return [
    {
      label: 'Search Term',
      options: [
        {
          value: inputValue,
          label: inputValue,
          entity: 'search',
        },
      ],
    },
    {
      label: 'Top Hit',
      options: searchData.topHit.hits[0]
        ? [
            {
              ...searchData.topHit.hits[0],
              entity: 'topHit',
            },
          ]
        : [],
    },
    {
      label: 'Targets',
      options: searchData.targets.hits,
    },
    {
      label: 'Diseases',
      options: searchData.diseases.hits,
    },
    {
      label: 'Drugs (Generic Name)',
      options: searchData.drugs.hits,
    },
  ];
};

const IndicatorSeparator = () => null;

const customStyles = {
  menuList: base => ({
    ...base,
    maxHeight: '500px',
  }),
  group: base => ({ ...base, padding: 0 }),
  container: base => ({ ...base, minWidth: '450px' }),
};

const components = {
  Option,
  Control,
  Placeholder,
  DropdownIndicator,
  GroupHeading,
  IndicatorSeparator,
  ValueContainer,
};

class Search extends Component {
  selectRef = React.createRef();

  loadOptions = inputValue => {
    if (inputValue.length < 3) {
      return;
    }

    return client2
      .query({
        query: SEARCH_QUERY,
        variables: { queryString: inputValue },
      })
      .then(res => {
        return groupOptions(res.data, inputValue);
      });
  };

  handleOnChange = (data, { action }) => {
    if (action === 'select-option') {
      const { history } = this.props;

      if (data.entity === 'search') {
        history.push(`/search?q=${data.value}`);
      } else if (data.entity === 'topHit') {
        history.push(`/${data.object.__typename.toLowerCase()}/${data.id}`);
      } else {
        history.push(`/${data.entity}/${data.id}`);
      }
    }
  };

  render() {
    return (
      <AsyncSelect
        ref={this.selectRef}
        cacheOptions
        loadOptions={this.loadOptions}
        onChange={this.handleOnChange}
        components={components}
        styles={customStyles}
        theme={theme => ({
          ...theme,
          borderRadius: 0,
        })}
        placeholder="Search for a target, disease, or drug..."
        openMenuOnClick={false}
      />
    );
  }
}

export default withRouter(Search);
