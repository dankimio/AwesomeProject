import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import CounterItem from './CounterItem';

export default class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 16,
    };
  }
  render() {
    const items = Array(this.state.count).fill(null).map((_, index) => <CounterItem key={index} />);

    return (
      <View style={styles.container}>
        {items}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
});
