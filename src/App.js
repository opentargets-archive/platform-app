import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.js";
import TargetPage from "./pages/TargetPage";
import DiseasePage from "./pages/DiseasePage";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={HomePage} />
          <Route path="/target/:ensgId" component={TargetPage} />
          <Route path="/disease/:efoId" component={DiseasePage} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
