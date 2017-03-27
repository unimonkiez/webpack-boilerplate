import React, { Component } from 'react';

const colors = ['red', 'green', 'blue'];

export default WrappedComponent => class Border extends Component {
  componentWillMount() {
    this.state = {
      index: 0
    };
    setInterval(() => {
      this.setState({
        index: (this.state.index + 1) % colors.length
      });
    }, 500);
  }
  render() {
    return (
      <div style={{ border: `4px solid ${colors[this.state.index]}` }}>
        <WrappedComponent {...this.props} />
      </div>
    );
  }
};

// Later in demo
// import hoistStatics from 'hoist-non-react-statics';
