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
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

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
              // value: searchData.topHit.id,
              // label: searchData.topHit.id,
              ...searchData.topHit,
              entityType: searchData.topHit.__typename.toLowerCase(),
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

const TargetOption = ({ innerRef, innerProps, isFocused, data }) => {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      {...innerProps}
    >
      <div>
        <Typography variant="subtitle1" style={{ display: 'inline-block' }}>
          {data.approvedSymbol}
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          style={{ display: 'inline-block', marginLeft: '8px' }}
        >
          {data.approvedName}
        </Typography>
      </div>
    </MenuItem>
  );
};

const DiseaseOption = ({ innerRef, innerProps, isFocused, data }) => {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      {...innerProps}
    >
      {data.name}
    </MenuItem>
  );
};

const DrugOption = ({ innerRef, innerProps, isFocused, data }) => {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      {...innerProps}
    >
      {data.name}
    </MenuItem>
  );
};

const Option = props => {
  const { innerRef, innerProps, isFocused, data } = props;

  switch (data.entityType) {
    case 'search':
      return (
        <MenuItem
          buttonRef={innerRef}
          selected={isFocused}
          component="div"
          {...innerProps}
        >
          {data.label}
        </MenuItem>
      );
    case 'target':
      return <TargetOption {...props} />;
    case 'disease':
      return <DiseaseOption {...props} />;
    default:
      return <DrugOption {...props} />;
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
        history.push(`/${data.entityType}/${data.id}`);
      }
    }
  };

  render() {
    return (
      <AsyncSelect
        cacheOptions
        loadOptions={this.loadOptions}
        onChange={this.handleOnChange}
        components={{ Option }}
      />
    );
  }
}

export default withRouter(Search);
