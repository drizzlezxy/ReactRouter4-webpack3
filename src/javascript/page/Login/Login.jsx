import React, { Component } from 'react';
import 'scss/Login/index.scss';

class PageComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
    };
  }

  render () {
    return (
      <div className="m-login">
        <span className="m-page-name">pageName: Login</span>
        <span className="m-page-color">pageColor: green</span>
      </div>
    );
  }
}

export default PageComponent;
