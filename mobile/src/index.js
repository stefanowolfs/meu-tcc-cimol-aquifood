import store from './store';

import { Provider } from 'react-redux';

import React, { Component } from 'react';

import RootNavigator from './router';

export default class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <RootNavigator />
         </Provider>
      );
   }
}
