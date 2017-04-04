import { PropTypes } from 'react';
import getContextProvider from 'src/hoc/context/get-context-provider.js';

export const { Provider, Hoc } = getContextProvider({
  color: PropTypes.string
});
