import React, { Component, PropTypes } from 'react';
// import { Hoc as AppHoc } from 'src/container/provider.js';
import controllerHoc from 'src/hoc/controller.js';

@controllerHoc(['chosenIndex'])
export default class Switch extends Component {
  static propTypes = {
    list: PropTypes.any,
    chosenIndex: PropTypes.any,
    setChosenIndex: PropTypes.any
  };
  render() {
    const { list, chosenIndex, setChosenIndex } = this.props;

    return (
      <div>
        {list[chosenIndex]}
        <button onClick={() => setChosenIndex((chosenIndex + 1) % list.length)}>
          Switch
        </button>
      </div>
    );
  }
}
