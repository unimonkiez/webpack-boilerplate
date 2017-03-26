import React, { Component } from 'react';

export default color => WrappedComponent => class Border extends Component {
  render() {
    return (
      <div style={{ border: `4px solid ${color}` }}>
        <WrappedComponent {...this.props} />
      </div>
    );
  }
};
