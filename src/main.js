/* global Raven */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux';
import { polyfill } from 'es6-promise';
import 'isomorphic-fetch';

import routes from './routes';
import configureStore from './configureStore';
import './styles/styles.less';

polyfill();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render((
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
    />
  </Provider>
), document.getElementById('app'));
