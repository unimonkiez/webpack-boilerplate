import uuid from 'uuid/v1';
import { Component, PropTypes } from 'react';
import getPropsContextHoc from './get-props-context-hoc.js';

export default contextTypesObj => {
  const contextObjectName = `t2kContextProvider-${uuid()}`;
  const contextObjectMapFn = ctx => ctx[contextObjectName];
  const contextTypes = {
    [contextObjectName]: PropTypes.shape(contextTypesObj)
  };
  class ContextProvider extends Component {
    static childContextTypes = contextTypes;

    getChildContext() {
      // Filtering out children
      // eslint-disable-next-line no-unused-vars
      const { children, ...otherProps } = this.props;
      return {
        [contextObjectName]: otherProps
      };
    }

    render() {
      return this.props.children;
    }
  }
  if (__DEV__) {
    ContextProvider.propTypes = {
      children: PropTypes.node,
      ...contextTypesObj
    };
  }
  return {
    Provider: ContextProvider,
    Hoc: getPropsContextHoc(contextTypes, contextObjectMapFn)
  };
};
