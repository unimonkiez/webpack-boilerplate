import React, { Component, PropTypes } from 'react';
import ColorToRgb from 'src/hoc/color.to.rgb.jsx';

@ColorToRgb({ redPropName: 'redStr' })
export default class ShowAppColor extends Component {
  static propTypes = {
    redStr: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
    blue: PropTypes.number.isRequired
  };
  render() {
    const { redStr: red, green, blue } = this.props;
    return (
      <div>
        <div>
          red: {red}
        </div>
        <div>
          green: {green}
        </div>
        <div>
          blue: {blue}
        </div>
      </div>
    );
  }
}
