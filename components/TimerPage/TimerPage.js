import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import TimerLabel from './TimerLabel';
import RoundedButton from '../RoundedButton';
import Counter from './Counter';

export default class TimerPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TimerLabel />
          <RoundedButton text="Start" style={{ marginBottom: 16 }} />
          <Counter />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 44
  }
});
