/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

import TabBar from './components/TabBar'

export default class AwesomeProject extends Component {
  _onPressButton() {
    console.log('Hello!');
  }

  render() {
    return (
      <TabBar />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
