import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import CounterItem from './CounterItem';

export default class Counter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const items = Array(this.props.count).fill(null).map((_, index) => <CounterItem key={index} />);

    return (
      <View style={styles.container}>
        {items}
      </View>
    );
  }
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
});
