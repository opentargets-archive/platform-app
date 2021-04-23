// see https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// styling
import 'dc/dc.min.css';
import './index.scss';

ReactDOM.render(<App />, document.getElementById('root'));
