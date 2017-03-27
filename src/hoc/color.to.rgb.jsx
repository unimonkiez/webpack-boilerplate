import React, { Component } from 'react';
import getRgbByCssColor from 'src/core/get.rgb.by.css.color.js';

export default ({
  greenPropName = 'green',
  redPropName = 'red',
  bluePropName = 'blue'
} = {}) => WrappedComponent => class ColorToRgb extends Component {
  render() {
    const { color, ...otherProps } = this.props;
    const { green, blue, red } = getRgbByCssColor(color);
    const colorObj = {
      [greenPropName]: green,
      [redPropName]: red,
      [bluePropName]: blue
    };
    return (
      <WrappedComponent
        {...colorObj}
        {...otherProps}
      />
    );
  }
};

// Later in demo
// import hoistStatics from 'hoist-non-react-statics';
