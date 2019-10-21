import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { loader } from 'graphql.macro';
import { Search as OtSearch } from 'ot-ui';

import SearchOption from './SearchOption';

const SEARCH_QUERY = loader('./SearchQuery.gql');

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api-beta-dot-open-targets-eu-dev.appspot.com/graphql',
  }),
  cache: new InMemoryCache(),
});

const asGroupedOptions = data => {
  return [
    {
      label: 'Targets',
      options: data.targets.map(target => ({ ...target, groupType: 'target' })),
    },
    {
      label: 'Drugs',
      options: data.drugs.map(drug => ({ ...drug, groupType: 'drug' })),
    },
  ];
};

class Search extends Component {
  handleInputChange = inputValue => {
    if (!inputValue || inputValue.length < 3) {
      return;
    }

    return client
      .query({
        query: SEARCH_QUERY,
        variables: { queryString: inputValue },
      })
      .then(res => {
        if (res.data && res.data.search) {
          return asGroupedOptions(res.data.search);
        } else {
          return asGroupedOptions({
            targets: [],
            drugs: [],
          });
        }
      });
  };

  handleSelectOption = (value, { action }) => {
    const { history } = this.props;

    if (action === 'select-option') {
      switch (value.groupType) {
        case 'target':
          history.push(`/target/${value.id}`);
          break;
        case 'drug':
          history.push(`/drug/${value.id}`);
          break;
        default:
          break;
      }
    }
  };

  render() {
    return (
      <OtSearch
        optionComponent={SearchOption}
        onInputChange={this.handleInputChange}
        onSelectOption={this.handleSelectOption}
      />
    );
  }
}

export default withRouter(Search);
