import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is going to be a settings tab for matches.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
