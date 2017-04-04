import React, { Component, PropTypes } from 'react';
import { Hoc as AppHoc } from 'src/container/provider.js';
// import RedBorderHoc from 'src/hoc/red-border.jsx';

@AppHoc(ctx => ({
  textColor: ctx.color
}))
export default class Input extends Component {
  static propTypes = {
    textColor: PropTypes.string.isRequired
  };
  state = {
    myText: 'abc'
  };
  render() {
    const { textColor: color } = this.props;
    const { myText } = this.state;
    return (
      <div>
        <input
          style={{ color }}
          value={myText}
          onChange={e => this.setState({ myText: e.target.value })}
        />
        <button onClick={() => this.setState({ myText: '' })}>
          Reset
        </button>
      </div>
    );
  }
}
