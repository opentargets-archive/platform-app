import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { loader } from 'graphql.macro';
import AsyncSelect from 'react-select/lib/Async';

import introspectionQueryResultData from './fragmentTypes.json';
import Control from './Control';
import Placeholder from './Placeholder';
import DropdownIndicator from './DropdownIndicator';
import GroupHeading from './GroupHeading';
import Option from './Option';

const SEARCH_QUERY = loader('./SearchQuery.gql');

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
});

const groupOptions = (searchData, inputValue) => {
  return [
    {
      label: 'Search ',
      options: [
        {
          value: inputValue,
          label: inputValue,
          entityType: 'search',
        },
      ],
    },
    {
      label: 'Top Hit',
      options: searchData.topHit
        ? [
            {
              ...searchData.topHit,
              entityType: 'topHit',
            },
          ]
        : [],
    },
    {
      label: 'Targets',
      options: searchData.targets.map(target => {
        return {
          ...target,
          entityType: 'target',
        };
      }),
    },
    {
      label: 'Diseases',
      options: searchData.diseases.map(disease => {
        return {
          ...disease,
          entityType: 'disease',
        };
      }),
    },
    {
      label: 'Drugs',
      options: searchData.drugs.map(drug => {
        return {
          ...drug,
          entityType: 'drug',
        };
      }),
    },
  ];
};

const IndicatorSeparator = () => null;

const customStyles = {
  menuList: base => ({
    ...base,
    maxHeight: '500px',
  }),
};

class Search extends Component {
  selectRef = React.createRef();

  loadOptions = inputValue => {
    if (inputValue.length < 3) {
      return;
    }

    return client
      .query({
        query: SEARCH_QUERY,
        variables: { queryString: inputValue, page: { index: 0, size: 9 } },
      })
      .then(res => groupOptions(res.data.search, inputValue));
  };

  handleOnChange = (data, { action }) => {
    if (action === 'select-option') {
      const { history } = this.props;

      if (data.entityType === 'search') {
        const { inputValue } = this.selectRef.current.state;
        history.push(`/search?q=${inputValue}`);
      } else if (data.entityType === 'topHit') {
        history.push(`${data.__typename.toLowerCase()}/${data.id}`);
      } else {
        history.push(`/${data.entityType}/${data.id}`);
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
        components={{
          Option,
          DropdownIndicator,
          Control,
          IndicatorSeparator,
          Placeholder,
          GroupHeading,
        }}
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
