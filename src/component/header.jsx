import React, { Component } from 'react';
import RedBorderHoc from 'src/hoc/red-border.jsx';
import BorderHoc from 'src/hoc/border.jsx';
import Input from './input.jsx';


@RedBorderHoc
@BorderHoc('purple')
export default class Header extends Component {
  // static propTypes = {
  //   color: PropTypes.string.isRequired
  // };
  render() {
    return (
      <div>
        Header
        <Input />
      </div>
    );
  }
}
