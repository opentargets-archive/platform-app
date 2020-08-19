// see https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line
import tnt from 'tntvis';
// eslint-disable-next-line
import utils from 'tnt.utils';
// eslint-disable-next-line
import rest from 'tnt.rest';

import tooltip from './utils/tooltip';

import App from './App';

// styling
import 'dc/dc.min.css';
import './index.scss';

// set up tntvis with modified tooltip script (breaks otherwise)
// window.tnt = tnt;
window.tnt.tooltip = tooltip;

ReactDOM.render(<App />, document.getElementById('root'));
