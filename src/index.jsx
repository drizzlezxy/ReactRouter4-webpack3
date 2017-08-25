import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
  <div>
    <Router>
      <div>
        <ul style={{fontSize: '30px', padding: '10px', color: 'blue', lineHeight: '45px'}}>
          <li>
            <Link to="/Manage">link to Manage:</Link>
            <div style={{ color: 'gray', fontSize: '20px' }}>css worked</div>
          </li>
          <li>
            <Link to="/Login">link to Login:</Link>
            <div style={{ color: 'gray', fontSize: '20px' }}>this page use 'bundle-loader' to load, but css file is not generate</div>
          </li>
        </ul>
        <hr />

        <Switch>
          
          {routes.map((route, i) => (
            <Route key={i} path={route.path} render={props => (
              <route.component {...props} routes={route.routes} />
            )} />
          ))}
        </Switch>

      </div>
    </Router>
  </div>
);

function doRender () {
  ReactDOM.render(<BasicRouter />, document.getElementById('app'));
}

setTimeout(doRender, 16);
