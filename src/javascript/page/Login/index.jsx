import React from 'react';
import Bundle from 'components/Bundle/Bundle';
import loadPage from 'bundle-loader?lazy!./Login';

const Login = (props) => (
  <Bundle load={loadPage}>
    {(Page) => <Page {...props} />}
  </Bundle>
);

export default Login;
