// see https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import Refiner from 'refiner-js';

import App from './App';

// styling
import 'dc/dc.min.css';
import './index.scss';

// Add refiner.io popup, but only outside of development environment!
if (process.env.NODE_ENV !== 'development') {
  Refiner('setProject', 'ade7da40-a960-11ea-9bbb-37035544d167');
}

ReactDOM.render(<App />, document.getElementById('root'));
