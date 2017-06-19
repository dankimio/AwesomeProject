import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

export default class RoundedButton extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor="#fafafa"
        style={[styles.container, this.props.style]}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

RoundedButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
};

RoundedButton.defaultProps = {
  style: [],
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e94248',
  },
  button: {
    backgroundColor: '#e94248',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
