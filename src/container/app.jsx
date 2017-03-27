import React, { Component, PropTypes } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from 'src/component/header.jsx';
import ShowAppColor from 'src/component/show-app-color.jsx';

export default class App extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired
  };
  static childContextTypes = {
    appColor: PropTypes.string.isRequired
  };
  getChildContext() {
    const { color } = this.props;
    return {
      appColor: color
    };
  }
  render() {
    const { color } = this.props;
    return (
      <div style={{ color }}>
        <Header />
        <ShowAppColor color={color} />
        Your app
      </div>
    );
  }
}
