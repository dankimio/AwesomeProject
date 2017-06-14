import React, { Component } from "react";
import { AppRegistry, StyleSheet, View } from "react-native";

import CounterItem from "./CounterItem";

const numberOfItems = 5;

export default class Counter extends Component {
  render() {
    let items = Array(numberOfItems).fill(null).map((_, index) => {
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
    flexDirection: "row"
  }
});
