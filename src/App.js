import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { OtUiThemeProvider } from 'ot-ui';

import HomePage from './pages/HomePage.js';
import TargetPage from './pages/TargetPage';
import TargetAssociationsPage from './pages/TargetAssociationsPage';
import DiseasePage from './pages/DiseasePage';

class App extends Component {
  render() {
    return (
      <OtUiThemeProvider>
        <Router>
          <React.Fragment>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/target/:ensgId" component={TargetPage} />
            <Route path="/disease/:efoId" component={DiseasePage} />
            <Route
              path="/target/:ensgId/associations"
              component={TargetAssociationsPage}
            />
          </React.Fragment>
        </Router>
      </OtUiThemeProvider>
    );
  }
}

export default App;
