import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class TimerLabel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text style={styles.label}>25:00</Text>;
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 108,
    fontWeight: '100',
    color: '#f05a5a',
    marginBottom: 16,
    textAlign: 'center'
  }
});
