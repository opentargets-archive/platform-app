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
      label: 'Search: ',
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
              value: searchData.topHit.id,
              label: searchData.topHit.id,
              entityType: searchData.topHit.__typename.toLowerCase(),
            },
          ]
        : [],
    },
    {
      label: 'Targets',
      options: searchData.targets.map(target => {
        return {
          value: target.id,
          label: target.approvedSymbol,
          entityType: 'target',
        };
      }),
    },
    {
      label: 'Diseases',
      options: searchData.diseases.map(disease => {
        return {
          value: disease.id,
          label: disease.name,
          entityType: 'disease',
        };
      }),
    },
    {
      label: 'Drugs',
      options: searchData.drugs.map(drug => {
        return {
          value: drug.id,
          label: drug.name,
          entityType: 'drug',
        };
      }),
    },
  ];
};

const Option = props => {
  const { innerRef, innerProps, data } = props;

  switch (data.entityType) {
    case 'search':
      return (
        <div ref={innerRef} {...innerProps}>
          {data.label}
        </div>
      );
    case 'target':
      return (
        <div ref={innerRef} {...innerProps}>
          {data.label}
        </div>
      );
    case 'disease':
      return (
        <div ref={innerRef} {...innerProps}>
          {data.label}
        </div>
      );
    case 'drug':
      return (
        <div ref={innerRef} {...innerProps}>
          {data.label}
        </div>
      );
    default:
      return (
        <div ref={innerRef} {...innerProps}>
          default
        </div>
      );
  }
};

class Search extends Component {
  loadOptions = inputValue => {
    if (inputValue.length < 3) {
      return;
    }

    return client
      .query({
        query: SEARCH_QUERY,
        variables: { queryString: inputValue },
      })
      .then(res => groupOptions(res.data.search, inputValue));
  };

  handleOnChange = (data, { action }) => {
    if (action === 'select-option') {
      const { history } = this.props;

      if (data.entityType === 'search') {
        history.push(`/search`);
      } else {
        history.push(`/${data.entityType}/${data.value}`);
      }
    }
  };

  render() {
    return (
      <AsyncSelect
        cacheOptions
        loadOptions={this.loadOptions}
        onChange={this.handleOnChange}
      />
    );
  }
}

export default withRouter(Search);
