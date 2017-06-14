import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class RoundedButton extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor="#fafafa"
        style={this.props.style}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e94248',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 8
  },
  buttonText: {
    color: 'white'
  }
});
