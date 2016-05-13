import React from 'react';
import { Component } from 'react';

import Header from './shared/header';
import Error from './shared/error';
import Footer from './shared/footer';

const containerStyles = {
  marginBottom: '100px'
};

export default class App extends Component {
  componentWillReceiveProps() {
    window.previousLocation = this.props.location;
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={containerStyles}>
          <Error />
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
