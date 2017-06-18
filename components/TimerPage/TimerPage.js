import React, { Component } from 'react';
import { Alert, AppState, AsyncStorage, LayoutAnimation, StyleSheet, View } from 'react-native';

import TimerLabel from './TimerLabel';
import RoundedButton from '../RoundedButton';
import EmptyRoundedButton from '../EmptyRoundedButton';
import Counter from './Counter';

// const defaultSeconds = 25 * 60;
const defaultSeconds = 15;

export default class TimerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      seconds: defaultSeconds,
      isRunning: false,
      isPaused: false,
      timeoutID: null,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
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
    console.log('Tick');

    this.setState({
      seconds: this.state.seconds - 1,
    });

    if (this.state.seconds <= 0) {
      this.stop();
      Alert.alert('Time is up!');
    }
  }

  start() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

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

  handleAppStateChange() {
    if (AppState.currentState === 'active') {
      this.load();
    }
    if (AppState.currentState === 'inactive') {
      this.save();
    }
  }

  async save() {
    if (!this.state.isRunning || this.state.isPaused) {
      return;
    }

    let date = new Date();
    date = new Date(date.setSeconds(date.getSeconds() + this.state.seconds));

    try {
      await AsyncStorage.setItem('seconds', JSON.stringify(date));
    } catch (error) {}
  }

  async load() {
    try {
      const value = await AsyncStorage.getItem('seconds');
      const dateString = JSON.parse(value);
      if (dateString === null) {
        return;
      }

      const date = new Date(dateString);
      if (date === null) {
        return;
      }

      const now = new Date();
      const differenceInSeconds = (date.getTime() - now.getTime()) / 1000;

      if (differenceInSeconds <= 0) {
        return;
      }

      this.setState({ seconds: Math.trunc(differenceInSeconds) });
    } catch (error) {}
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
