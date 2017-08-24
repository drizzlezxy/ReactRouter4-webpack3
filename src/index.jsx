import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import 'scss/base.scss';

import Login from 'page/Login';
import Manage from 'page/Manage';

const routes = [
  { path: '/Login', component: Login },
  { path: '/Manage', component: Manage, },
];

const BasicRouter = () => (
  <Router>
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} path={route.path} render={props => (
          <route.component {...props} routes={route.routes} />
        )} />
      ))}

      <Route component={Login} />
    </Switch>
  </Router>
);

function doRender () {
  ReactDOM.render(<BasicRouter />, document.getElementById('app'));
}

setTimeout(doRender, 16);
