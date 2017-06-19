import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

export default class EmptyRoundedButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHighlighted: false,
    };
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        onShowUnderlay={() => this.setState({ isHighlighted: true })}
        onHideUnderlay={() => this.setState({ isHighlighted: false })}
        underlayColor="#e94248"
        style={[styles.container, this.props.style]}
      >
        <View style={styles.button}>
          <Text style={[styles.buttonText, this.highlightedStyles()]}>
            {this.props.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  highlightedStyles() {
    if (!this.state.highlightedStyles) {
      return {};
    }

    return { color: 'white' };
  }
}

EmptyRoundedButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#e94248',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 8,
  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#e94248',
  },
});
