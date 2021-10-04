import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';

import OtUiThemeProvider from './components/OtUiThemeProvider';
import client from './client';
import initLocalStorage from './utils/initLocalStorage';
import theme from './theme';

import LoadingBackdrop from './components/LoadingBackdrop';

const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const DiseasePage = lazy(() => import('./pages/DiseasePage'));
const DownloadsPage = lazy(() => import('./pages/DownloadsPage'));
const DrugPage = lazy(() => import('./pages/DrugPage'));
const TargetPage = lazy(() => import('./pages/TargetPage'));
const EvidencePage = lazy(() => import('./pages/EvidencePage'));
const VariantsPage = lazy(() => import('./pages/VariantsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

class App extends Component {
  componentDidMount() {
    initLocalStorage();
  }

  render() {
    return (
      <RecoilRoot>
        <ApolloProvider client={client}>
          <OtUiThemeProvider theme={theme}>
            <Router>
              <Suspense fallback={<LoadingBackdrop />}>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/search" component={SearchPage} />
                  <Route path="/downloads" component={DownloadsPage} />
                  <Route path="/disease/:efoId" component={DiseasePage} />
                  <Route path="/target/:ensgId" component={TargetPage} />
                  <Route path="/drug/:chemblId" component={DrugPage} />
                  <Route
                    path="/evidence/:ensgId/:efoId"
                    component={EvidencePage}
                  />
                  <Route path="/variants" component={VariantsPage} />
                  <Route component={NotFoundPage} />
                </Switch>
              </Suspense>
            </Router>
          </OtUiThemeProvider>
        </ApolloProvider>
      </RecoilRoot>
    );
  }
}

export default App;
