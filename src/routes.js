import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './Common/app';
import Header from './Common/header';
import Footer from './Common/footer';
import Home from './Home/home';
import Dashboard from './Dashboard/dashboard';
import NotFound from './Common/notfound';


const routes = (
  <Route path="/" component={App}>
    <IndexRoute components={{ header: Header, main: Home, footer: Footer }} />
    <Route path="/dashboard" components={{ header: Header, main: Dashboard, footer: Footer }} />
    <Route path="*" components={{ header: Header, main: NotFound, footer: Footer }} />
  </Route>
);

export default routes;
