import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { OtUiThemeProvider } from 'ot-ui';

import client from './client';
import initLocalStorage from './utils/initLocalStorage';
import GoogleAnalyticsWrapper from './components/GoogleAnalyticsWrapper';
import theme from './theme';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DiseasePage from './pages/DiseasePage';
import DownloadsPage from './pages/DownloadsPage';
import DrugPage from './pages/DrugPage';
import TargetPage from './pages/TargetPage';
import EvidenceByDatatypePage from './pages/EvidenceByDatatypePage';
import notFoundPage from './pages/NotFoundPage';

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
                <Route path="/disease/:efoId" component={DiseasePage} />
                <Route path="/target/:ensgId" component={TargetPage} />
                <Route path="/drug/:chemblId/profile" component={DrugPage} />
                <Route
                  path="/evidence/:ensgId/:efoId"
                  component={EvidenceByDatatypePage}
                />
                <Route component={notFoundPage} />
              </Switch>
            </GoogleAnalyticsWrapper>
          </Router>
        </OtUiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
