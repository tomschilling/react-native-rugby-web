import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Router from './app/Router';

import store from './app/Store'; //Import the store

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router/>
      </Provider>
    );
  }
}