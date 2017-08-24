import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import 'scss/Manage/index.scss';

class PageComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className="m-manage">
        <div className="m-page-name">pageName: Manege</div>
        <div className="m-page-color">pageColor: blue</div>
      </div>
    );
  }
}

export default PageComponent;
