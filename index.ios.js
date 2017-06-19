/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import TabBar from './app/components/TabBar';

export default class AwesomeProject extends Component {
  render() {
    return <TabBar />;
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
