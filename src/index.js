import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';

import App from './App';
import config from './config';

import 'typeface-inter';
import './index.scss';

if (config.profile.googleTagManagerID) {
  TagManager.initialize({ gtmId: config.profile.googleTagManagerID });
}

ReactDOM.render(<App />, document.getElementById('root'));
