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
        <div className="m-page-name">pageName: Login</div>
        <div className="m-page-color">pageColor: green</div>
      </div>
    );
  }
}

export default PageComponent;
