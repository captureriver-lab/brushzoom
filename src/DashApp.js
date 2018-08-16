import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';

import App from "./containers/App/App";


export default () => (
<Provider store={store}>
    <App />
</Provider>)
