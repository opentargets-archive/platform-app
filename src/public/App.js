import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { OtUiThemeProvider } from 'ot-ui';

import HomePage from './home/Page';
import TargetPage from './target/Page';
import DiseasePage from './disease/Page';
import DrugPage from './drug/Page';
import EvidencePage from './evidence/Page';
import initLocalStorage from './common/initLocalStorage';

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
        <OtUiThemeProvider>
          <Router>
            <React.Fragment>
              <Route exact path="/" component={HomePage} />
              <Route path="/target/:ensgId" component={TargetPage} />
              <Route path="/disease/:efoId" component={DiseasePage} />
              <Route path="/drug/:chemblId" component={DrugPage} />
              <Route path="/evidence/:ensgId/:efoId" component={EvidencePage} />
            </React.Fragment>
          </Router>
        </OtUiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
