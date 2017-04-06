/* global Raven */
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes';

import './styles/styles.less';

// import ConfigureStore from './configureStore';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render((
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
), document.getElementById('app'));
