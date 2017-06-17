import React, { Component } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import TimerLabel from './TimerLabel';
import RoundedButton from '../RoundedButton';
import EmptyRoundedButton from '../EmptyRoundedButton';
import Counter from './Counter';

const defaultSeconds = 25 * 60;

export default class TimerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: defaultSeconds,
      isRunning: false,
      isPaused: false,
      timeoutID: null,
    };
  }

  componentDidMount() {
    // this.start();
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TimerLabel seconds={this.state.seconds} />
          {this.primaryButton()}
          {this.secondaryButton()}
          <Counter />
        </View>
      </View>
    );
  }

  primaryButton() {
    if (!this.state.isRunning) {
      return (
        <RoundedButton text="Start" style={{ marginBottom: 16 }} onPress={this.start.bind(this)} />
      );
    }
    if (this.state.isPaused) {
      return (
        <RoundedButton
          text="Resume"
          style={{ marginBottom: 16 }}
          onPress={this.resume.bind(this)}
        />
      );
    }
    return (
      <RoundedButton text="Pause" style={{ marginBottom: 16 }} onPress={this.pause.bind(this)} />
    );
  }

  secondaryButton() {
    if (!this.state.isRunning) {
      return null;
    }

    return (
      <EmptyRoundedButton text="Stop" style={{ marginBottom: 16 }} onPress={this.stop.bind(this)} />
    );
  }

  tick() {
    this.setState({
      seconds: this.state.seconds - 1,
    });

    if (this.state.seconds <= 0) {
      this.stop();
      Alert.alert('Time is up!');
    }
  }

  start() {
    this.startTicking();
    this.setState({
      isRunning: true,
      isPaused: false,
    });
  }

  pause() {
    this.stopTicking();
    this.setState({
      isPaused: true,
    });
  }

  resume() {
    this.startTicking();
    this.setState({
      isRunning: true,
      isPaused: false,
    });
  }

  stop() {
    console.log('STOP');
    this.stopTicking();
    this.setState({
      seconds: defaultSeconds,
      isRunning: false,
      isPaused: false,
    });
  }

  startTicking() {
    const timeoutID = setInterval(this.tick.bind(this), 1000);

    this.setState({
      timeoutID,
    });
  }

  stopTicking() {
    clearInterval(this.state.timeoutID);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 44,
  },
});
