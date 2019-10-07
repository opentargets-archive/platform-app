import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { OtUiThemeProvider } from 'ot-ui';
import initLocalStorage from './common/initLocalStorage';
import BasePage from './common/BasePage';
import theme from './theme';

const HomePage = lazy(() => import('./home/Page'));
const DownloadsPage = lazy(() => import('./downloads/Page'));
const TargetPage = lazy(() => import('./target/Page'));
const DiseasePage = lazy(() => import('./disease/Page'));
const DrugPage = lazy(() => import('./drug/Page'));
const EvidencePage = lazy(() => import('./evidenceByDatatype/Page'));

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
            <BasePage>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/downloads" component={DownloadsPage} />
                  <Route path="/target/:ensgId" component={TargetPage} />
                  <Route path="/disease/:efoId" component={DiseasePage} />
                  <Route path="/drug/:chemblId" component={DrugPage} />
                  <Route
                    path="/evidence/:ensgId/:efoId"
                    component={EvidencePage}
                  />
                </Switch>
              </Suspense>
            </BasePage>
          </Router>
        </OtUiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
