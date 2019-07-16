import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line
import tnt from 'tntvis';
// eslint-disable-next-line
import utils from 'tnt.utils';
// eslint-disable-next-line
import rest from 'tnt.rest';

import tooltip from './utils/tooltip';
import * as serviceWorker from './serviceWorker';

import App from './public/App';

// styling
import 'dc/dc.min.css';
import './index.css';
import './index.scss';

// set up tntvis with modified tooltip script (breaks otherwise)
// window.tnt = tnt;
window.tnt.tooltip = tooltip;

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
