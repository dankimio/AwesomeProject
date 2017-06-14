import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e94248",
    padding: 10,
    alignItems: "center",
    borderRadius: 5
  },
  buttonText: {
    color: "white"
  }
});

export default class RoundedButton extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => 1} underlayColor="#fafafa">
        <View style={styles.button}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
