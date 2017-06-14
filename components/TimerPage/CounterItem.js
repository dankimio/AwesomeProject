import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';

export default class CounterItem extends Component {
  render() {
    return <View style={styles.item} />;
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#e94248',
    height: 25,
    width: 25,
    borderRadius: 16,
    marginHorizontal: 5,
    marginBottom: 8
  }
});
