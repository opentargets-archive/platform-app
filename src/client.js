import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const client = new ApolloClient({
  link: new HttpLink({
    // uri: 'https://platform-api-alpha.opentargets.io/api/v4/graphql',
    uri: 'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',

    // uri:
    //   'https://hpo-1-0-dot-api-beta-dot-open-targets-eu-dev.ew.r.appspot.com/api/v4/graphql',
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
});

const betaClient = new ApolloClient({
  link: new HttpLink({
    uri:
      'https://api-beta-dot-open-targets-eu-dev.ew.r.appspot.com/api/v4/graphql',
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
});

export { betaClient };
export default client;
