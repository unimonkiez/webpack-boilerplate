import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './container/app.jsx';
import './style.css';

injectTapEventPlugin(); // Needed for onTouchTap

window.onload = () => {
  const div = document.getElementById('app');
  ReactDOM.render(React.createElement(App, {
    color: 'black'
  }), div);

  // const div2 = document.getElementById('app2');
  // ReactDOM.render(React.createElement(App, {
  //   color: 'blue'
  // }), div2);
};
