import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text } from 'react-native';

export default class TimerLabel extends Component {
  render() {
    return (
      <Text style={styles.label}>
        {this.formattedTime()}
      </Text>
    );
  }

  formattedTime() {
    // Pad with zeros
    let minutes = `${Math.floor(this.props.seconds / 60)}`.padStart(2, '0');
    let seconds = `${this.props.seconds % 60}`.padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 108,
    fontWeight: '100',
    color: '#f05a5a',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Helvetica Neue'
  }
});
