// see https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import Refiner from 'refiner-js';
import TagManager from 'react-gtm-module';

import App from './App';

// styling
import 'dc/dc.min.css';
import './index.scss';

// Add Google Tag Manager and refiner.io popup in production
if (process.env.NODE_ENV === 'production') {
  Refiner('setProject', 'ade7da40-a960-11ea-9bbb-37035544d167');
  TagManager.initialize({ gtmId: 'GTM-WPXWRDV' });
}

ReactDOM.render(<App />, document.getElementById('root'));
