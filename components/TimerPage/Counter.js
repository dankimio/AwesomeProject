import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';

import CounterItem from './CounterItem';

export default class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 16
    };
  }
  render() {
    let items = Array(this.state.count).fill(null).map((_, index) => {
      return <CounterItem key={index} />;
    });

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
    marginTop: 8
  }
});
