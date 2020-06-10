import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { OtUiThemeProvider } from 'ot-ui';

import client from './client';
import initLocalStorage from './common/initLocalStorage';
import GoogleAnalyticsWrapper from './common/GoogleAnalyticsWrapper';
import theme from './theme';
import HomePage from './home/Page';
import SearchPage from './search/Page';
import DownloadsPage from './downloads/Page';
import TargetPage from './target/Page';
import DiseasePage from './disease/Page';
import DrugPage from './drug/Page';
import EvidencePage from './evidenceByDatatype/Page';
import NoMatchPage from './noMatch/Page.js';

class App extends Component {
  componentDidMount() {
    initLocalStorage();
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <OtUiThemeProvider theme={theme}>
          <Router>
            <GoogleAnalyticsWrapper>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/search" component={SearchPage} />
                <Route path="/downloads" component={DownloadsPage} />
                <Route path="/target/:ensgId" component={TargetPage} />
                <Route path="/disease/:efoId" component={DiseasePage} />
                <Route path="/drug/:chemblId" component={DrugPage} />
                <Route
                  path="/evidence/:ensgId/:efoId"
                  component={EvidencePage}
                />
                <Route component={NoMatchPage} />
              </Switch>
            </GoogleAnalyticsWrapper>
          </Router>
        </OtUiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
