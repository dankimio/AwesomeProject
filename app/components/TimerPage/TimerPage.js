import React, { Component } from 'react';
import {
  Alert,
  AppState,
  AsyncStorage,
  LayoutAnimation,
  PushNotificationIOS,
  StyleSheet,
  View,
} from 'react-native';

import TimerLabel from './TimerLabel';
import RoundedButton from '../RoundedButton';
import EmptyRoundedButton from '../EmptyRoundedButton';
import Counter from './Counter';

// const defaultSeconds = 25 * 60;
const defaultSeconds = 5;

export default class TimerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      seconds: defaultSeconds,
      isRunning: false,
      isPaused: false,
      timeoutID: null,
      pomodorosCount: 0,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
    PushNotificationIOS.requestPermissions(['alert', 'badge', 'sound']);
    this.setPomodorosCount();
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
          <Counter count={this.state.pomodorosCount} />
        </View>
      </View>
    );
  }

  primaryButton() {
    if (!this.state.isRunning) {
      return (
        <RoundedButton text="Start" style={{ marginBottom: 24 }} onPress={this.start.bind(this)} />
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
      this.incrementCount();
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
      PushNotificationIOS.cancelAllLocalNotifications();
    }
    if (AppState.currentState === 'inactive') {
      this.handleInactiveState();
    }
  }

  handleInactiveState() {
    // Return if paused or stopped
    if (!this.state.isRunning || this.state.isPaused) {
      return;
    }
    this.save();
    PushNotificationIOS.scheduleLocalNotification({
      fireDate: this.fireDate(),
      alertBody: 'Time is up!',
    });
  }

  fireDate() {
    const date = new Date();
    date.setSeconds(date.getSeconds() + this.state.seconds);
    return date;
  }

  setPomodorosCount() {
    AsyncStorage.getItem(this.currentDateKey()).then((value) => {
      const parsedValue = JSON.parse(value);
      const pomodorosCount = parsedValue === null ? 0 : parsedValue;
      this.setState({ pomodorosCount });
    });
  }

  incrementCount() {
    const newCount = this.state.pomodorosCount + 1;
    AsyncStorage.setItem(this.currentDateKey(), JSON.stringify(newCount));
    this.setPomodorosCount();
  }

  // Current date formatted as YYYY-MM-DD
  currentDateKey() {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  }

  async save() {
    try {
      await AsyncStorage.setItem('seconds', JSON.stringify(this.fireDate()));
    } catch (error) {}
  }

  async load() {
    try {
      // Read and parse date from storage
      const value = await AsyncStorage.getItem('seconds');
      const dateString = JSON.parse(value);
      // Remove date from storage
      await AsyncStorage.removeItem('seconds');
      if (dateString === null) {
        return;
      }
      // Create date from string
      const date = new Date(dateString);
      if (date === null) {
        return;
      }
      // Get difference in seconds to update remaining seconds
      const now = new Date();
      const differenceInSeconds = (date.getTime() - now.getTime()) / 1000;

      if (differenceInSeconds <= 0) {
        this.stop();
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
