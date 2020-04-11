import React, { Component } from 'react';
import AppNavigator from './app/AppNavigator';

export default class App extends Component {
  state = { items: [] };

  componentDidMount() {
    this._refreshItems();
  }

  _refreshItems = async () => {
    this.setState({ items });
  };


  render() {
    return (
      <AppNavigator
        screenProps={{
          items: this.state.items,
          refresh: this._refreshItems
        }}
      />
    );
  }
}
