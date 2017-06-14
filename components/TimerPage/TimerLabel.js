import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Alert } from 'react-native';

const defaultSeconds = 25 * 60;

export default class TimerLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: defaultSeconds
    };
  }

  componentDidMount() {
    this.start();
  }

  render() {
    return (
      <Text style={styles.label}>
        {this.formattedTime()}
      </Text>
    );
  }

  formattedTime() {
    // Pad with zeros
    let minutes = `${Math.floor(this.state.seconds / 60)}`.padStart(2, '0');
    let seconds = `${this.state.seconds % 60}`.padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  tick() {
    this.setState({
      seconds: this.state.seconds - 1
    });

    if (this.state.seconds <= 0) {
      this.stop();
      Alert.alert('Time is up!');
    }
  }

  start() {
    let timeoutID = setInterval(this.tick.bind(this), 1000);

    this.setState({
      timeoutID: timeoutID
    });
  }

  stop() {
    clearInterval(this.state.timeoutID);

    this.setState({
      seconds: defaultSeconds
    });
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
