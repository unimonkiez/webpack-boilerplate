import React, { Component, PropTypes } from 'react';
import RedBorderHoc from 'src/hoc/red-border.jsx';

@RedBorderHoc
export default class Header extends Component {
  static contextTypes = {
    appColor: PropTypes.string.isRequired
  };
  render() {
    const { appColor: color } = this.context;
    return (
      <div>
        <input
          style={{ color }}
          defaultValue="abc"
        />
      </div>
    );
  }
}
