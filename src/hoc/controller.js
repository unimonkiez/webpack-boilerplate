import { Component, createElement, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import capitalizeFirstLetter from 'src/core/capitalize-first-letter.js';

export default (propNamesToPass, options = {}) => {
  const { withRef = false } = options;
  // create object with names for each prop tranferred
  const propNamesToPassObjects = propNamesToPass.map(prop => {
    const propName = typeof prop === 'string' ? prop : prop.propName;
    const propNameWithCap = capitalizeFirstLetter(propName);

    // Default names for all names, can be overriden if passed as object (though `propName` is required)
    return {
      propName,
      defaultPropName: `default${propNameWithCap}`,
      onChangePropName: `on${propNameWithCap}Change`,
      handleChangePropName: `set${propNameWithCap}`,
      controlledPropIndicatorName: `is${propNameWithCap}Controlled`,
      ...(typeof prop === 'object' ? prop : undefined)
    };
  });
  const propsNamesNotToTransfer = propNamesToPassObjects.reduce((arr, prop) => {
    return [
      ...arr,
      prop.propName,
      prop.defaultPropName,
      prop.onChangePropName
    ];
  }, []);
  return WrappedComponent => {
    class ReactPropsControllerHoc extends Component {
      componentWillMount() {
        this.state = {};
        this._handlerProps = {};
        propNamesToPassObjects.forEach(prop => {
          const defaultPropValue = this.props[prop.defaultPropName];
          if (defaultPropValue !== undefined) {
            this.state[prop.propName] = defaultPropValue;
          }
          this._handlerProps[prop.handleChangePropName] = (newProp, ...otherProps) => {
            // Callback is called at the same time as setState so if setState will be called again in the callback,
            // react will batch the state changes and render will occur once
            if (this.props[prop.onChangePropName]) {
              this.props[prop.onChangePropName](newProp, ...otherProps);
            }
            const controlledProp = this.props[prop.propName] !== undefined;
            if (!controlledProp) {
              this.setState({
                [prop.propName]: newProp
              });
            }
          };
        });
      }
      render() {
        const propValuesToPass = propNamesToPassObjects.reduce((obj, prop) => {
          const isControlled = this.props[prop.propName] !== undefined;

          return {
            ...obj,
            [prop.propName]: this[isControlled ? 'props' : 'state'][prop.propName],
            [prop.controlledPropIndicatorName]: isControlled
          };
        }, {});
        const otherProps = {};
        Object.keys(this.props).forEach(propName => {
          const prop = this.props[propName];
          if (propsNamesNotToTransfer.indexOf(propName) === -1) {
            otherProps[propName] = prop;
          }
        });
        return createElement(WrappedComponent, {
          ...propValuesToPass,
          ...this._handlerProps,
          ...otherProps,
          ref: withRef ? 'wrappedInstance' : undefined
        });
      }
      getWrappedInstance() {
        if (__DEV__ && !withRef) {
          throw new Error('To access the wrapped instance, you need to specify ' +
          '{ withRef: true } as the fourth argument of the connect() call.');
        }
        // Using function ref will replace instance with null for no reason..
        // eslint-disable-next-line react/no-string-refs
        return this.refs.wrappedInstance;
      }
      forceUpdateDefaultProps(newDefaultPropValues, cb) {
        this.setState(newDefaultPropValues, cb);
      }
    }
    if (__DEV__) {
      ReactPropsControllerHoc.propTypes = propNamesToPassObjects.reduce((obj, prop) => {
        return {
          ...obj,
          [prop.propName]: props => {
            const propValue = props[prop.propName];
            if (propValue !== undefined && props[prop.onChangePropName] === undefined) {
              return new Error(`Must provide ${prop.onChangePropName} when providing ${prop.propName}, providing ${prop.propName} only will result in a readonly property.`);
            }
            return undefined;
          },
          [prop.onChangePropName]: PropTypes.func
        };
      }, {});
    }
    return hoistStatics(ReactPropsControllerHoc, WrappedComponent);
  };
};
