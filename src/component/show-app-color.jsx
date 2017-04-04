import React, { Component, PropTypes } from 'react';
import ColorToRgb from 'src/hoc/color.to.rgb.jsx';

@ColorToRgb({ redPropName: 'myRed' })
export default class ShowAppColor extends Component {
  static propTypes = {
    myRed: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
    blue: PropTypes.number.isRequired
  };
  render() {
    const { myRed: red, green, blue } = this.props;
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
