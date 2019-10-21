import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { loader } from 'graphql.macro';
import { Search as OtSearch } from 'ot-ui';

const SEARCH_QUERY = loader('./SearchQuery.gql');

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api-beta-dot-open-targets-eu-dev.appspot.com/graphql',
  }),
  cache: new InMemoryCache(),
});

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
        console.log('res', res);
      });
  };

  render() {
    return <OtSearch onInputChange={this.handleInputChange} />;
  }
}

export default Search;
