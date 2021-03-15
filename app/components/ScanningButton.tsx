import { Component } from 'react';

import * as React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles/ScanningButton.style';

import * as Speech from 'expo-speech';

class ScanningButton extends Component {
  componentDidMount() {
    setTimeout(() => {
      Speech.speak('Scanning for beacons');
    }, 2);
  }
  render() {
    const theme = this.props.theme;

    return (
      <Pressable
        style={[
          styles.container,
          {
            backgroundColor: theme.backgroundColor,
            borderColor: theme.borderColor
          }
        ]}
        onPress={() => {
          Speech.speak('Scanning for beacons');
        }}
        accessible={true}
        accessibilityLabel={this.props.accessibilityLabel}
      >
        <Text
          style={[styles.text, { color: theme.textColor }]}
          adjustsFontSizeToFit
        >
          Scanning...
        </Text>
      </Pressable>
    );
  }
}

export default ScanningButton;
