import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { OtUiThemeProvider } from 'ot-ui';
import initLocalStorage from './common/initLocalStorage';
import theme from './theme';

const HomePage = lazy(() => import('./home/Page'));
const TargetPage = lazy(() => import('./target/Page'));
const DiseasePage = lazy(() => import('./disease/Page'));
const DrugPage = lazy(() => import('./drug/Page'));
const EvidencePage = lazy(() => import('./evidence/Page'));

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://platform-api.now.sh/graphql',
  }),
  cache: new InMemoryCache(),
});

class App extends Component {
  componentDidMount() {
    initLocalStorage();
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <OtUiThemeProvider theme={theme}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Route exact path="/" component={HomePage} />
              <Route path="/target/:ensgId" component={TargetPage} />
              <Route path="/disease/:efoId" component={DiseasePage} />
              <Route path="/drug/:chemblId" component={DrugPage} />
              <Route path="/evidence/:ensgId/:efoId" component={EvidencePage} />
            </Suspense>
          </Router>
        </OtUiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
