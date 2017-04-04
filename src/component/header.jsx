import React, { Component } from 'react';
import RedBorderHoc from 'src/hoc/red-border.jsx';
import BorderHoc from 'src/hoc/border.jsx';
import Input from './input.jsx';
import Switch from './switch.jsx';


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
        <Input textColor="green" />
        <Switch list={['red', 'green', 'blue']} defaultChosenIndex={1} />
        <Input />
      </div>
    );
  }
}
