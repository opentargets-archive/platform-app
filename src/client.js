import { ApolloClient, InMemoryCache } from '@apollo/client';
import possibleTypes from './possibleTypes.json';
import config from './config';

const client = new ApolloClient({
  uri: config.urlApi,
  cache: new InMemoryCache({ possibleTypes }),
});

const betaClient = new ApolloClient({
  uri: config.urlApiBeta,
  cache: new InMemoryCache({ possibleTypes }),
});

export { betaClient };
export default client;
