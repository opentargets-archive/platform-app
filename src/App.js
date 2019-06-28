import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { OtUiThemeProvider } from 'ot-ui';

import HomePage from './public/home/Page';
import TargetPage from './public/target/Page';
import DiseasePage from './public/disease/Page';
import DrugPage from './public/drug/Page';

class App extends Component {
  render() {
    return (
      <OtUiThemeProvider>
        <Router>
          <React.Fragment>
            <Route exact path="/" component={HomePage} />
            <Route path="/target/:ensgId" component={TargetPage} />
            <Route path="/disease/:efoId" component={DiseasePage} />
            <Route path="/drug/:chemblId" component={DrugPage} />
          </React.Fragment>
        </Router>
      </OtUiThemeProvider>
    );
  }
}

export default App;
