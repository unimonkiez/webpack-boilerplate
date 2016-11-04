import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from '../component/header.jsx';

injectTapEventPlugin(); // Needed for onTouchTap

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          Your app
        </div>
      </MuiThemeProvider>
    );
  }
}
