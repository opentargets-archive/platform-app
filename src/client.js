import { ApolloClient, InMemoryCache } from '@apollo/client';
import possibleTypes from './possibleTypes.json';
import config from './config';

const client = new ApolloClient({
  uri: config.urlApi,
  cache: new InMemoryCache({ possibleTypes }),
  headers: { 'OT-Platform': true },
});

export default client;
