import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import TimerLabel from './TimerLabel';
import RoundedButton from '../RoundedButton';
import Counter from './Counter';

const defaultSeconds = 25 * 60;

export default class TimerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: defaultSeconds
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
          <RoundedButton
            text="Start"
            style={{ marginBottom: 16 }}
            onPress={this.start.bind(this)}
          />
          <Counter />
        </View>
      </View>
    );
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
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 44
  }
});
