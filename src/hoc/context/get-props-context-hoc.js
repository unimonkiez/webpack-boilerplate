import { Component, createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';

export default (contextTypes, contextObjectMapFn) => (contextMapFn, options = {}) => {
  const { withRef = false } = options;
  return WrappedComponent => {
    class ReactPropsContextWrapper extends Component {
      static contextTypes = contextTypes;

      getWrappedInstance() {
        if (__DEV__ && !withRef) {
          throw new Error('To access the wrapped instance, you need to specify ' +
          '{ withRef: true } as the fourth argument of the connect() call.');
        }
        // Using function ref will replace instance with null for no reason..
        // eslint-disable-next-line react/no-string-refs
        return this.refs.wrappedInstance;
      }

      render() {
        const contextObj = contextObjectMapFn(this.context);
        const contextPropsToMerge = contextObj !== undefined ? contextMapFn(contextObj) : {};

        const props = {
          ...contextPropsToMerge,
          ...this.props
        };

        return createElement(WrappedComponent, {
          ...props,
          ref: withRef ? 'wrappedInstance' : undefined
        });
      }
    }

    return hoistStatics(ReactPropsContextWrapper, WrappedComponent);
  };
};
