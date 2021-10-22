import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import OtUiThemeProvider from './components/OtUiThemeProvider';
import client from './client';
import initLocalStorage from './utils/initLocalStorage';
import theme from './theme';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DiseasePage from './pages/DiseasePage';
import DownloadsPage from './pages/DownloadsPage';
import DrugPage from './pages/DrugPage';
import TargetPage from './pages/TargetPage';
import EvidencePage from './pages/EvidencePage';
import VariantsPage from './pages/VariantsPage';
import PMTLDocPage from './pages/PMTLDocPage';
import NotFoundPage from './pages/NotFoundPage';
import PMTLPage from './pages/PMTLPage/PMTLPage';
import AboutPage from './pages/AboutPage';

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
                <Route path="/About" component={AboutPage} />
                <Route path="/fda-pmtl" component={PMTLPage} />
                <Route path="/fda-pmtl-docs" component={PMTLDocPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Router>
          </OtUiThemeProvider>
        </ApolloProvider>
      </RecoilRoot>
    );
  }
}

export default App;
