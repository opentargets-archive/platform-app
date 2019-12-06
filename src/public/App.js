import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { OtUiThemeProvider } from 'ot-ui';

import initLocalStorage from './common/initLocalStorage';
import theme from './theme';
import HomePage from './home/Page';
import SearchPage from './search/Page';
import DownloadsPage from './downloads/Page';
import TargetPage from './target/Page';
import DiseasePage from './disease/Page';
import DrugPage from './drug/Page';
import EvidencePage from './evidenceByDatatype/Page';

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
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/downloads" component={DownloadsPage} />
              <Route path="/target/:ensgId" component={TargetPage} />
              <Route path="/disease/:efoId" component={DiseasePage} />
              <Route path="/drug/:chemblId" component={DrugPage} />
              <Route path="/evidence/:ensgId/:efoId" component={EvidencePage} />
            </Switch>
          </Router>
        </OtUiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
