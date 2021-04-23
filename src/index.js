// see https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';

import App from './App';
import { config } from './config/Config';

// styling
import 'dc/dc.min.css';
import './index.scss';

if (config.GTMID) {
  TagManager.initialize({ gtmId: config.GTMID });
}

ReactDOM.render(<App />, document.getElementById('root'));
