import React, { Component, PropTypes } from 'react';
import { Provider } from 'src/container/provider.js';
import Header from 'src/component/header.jsx';
import ShowAppColor from 'src/component/show-app-color.jsx';

export default class App extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired
  };
  render() {
    const { color } = this.props;
    return (
      <Provider color={color}>
        <div style={{ color }}>
          <Header />
          <ShowAppColor color={color} blue="777" />
          Your app
        </div>
      </Provider>
    );
  }
}
