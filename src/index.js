import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import tnt from 'tntvis';
import utils from 'tnt.utils';
import rest from 'tnt.rest';

import tooltip from './utils/tooltip';
import App from './App';
import * as serviceWorker from './serviceWorker';

// styling
import 'dc/dc.min.css';
import './index.css';
import './index.scss';

// set up tntvis with modified tooltip script (breaks otherwise)
// window.tnt = tnt;
window.tnt.tooltip = tooltip;

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://platform-graphql.opentargets.io/graphql',
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
