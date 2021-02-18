import { Component } from 'react';

import * as React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles/ScanningButton.style';

import * as Speech from 'expo-speech';
import DefaultColors from '../constants/DefaultColors';

class ScanningButton extends Component {
  render() {
    return (
      <Pressable
        style={styles.buttonContainer}
        android_ripple={DefaultColors.rippleColor}
        onPress={() => {
          Speech.speak('Scanning for beacons');
        }}
        accessible={true}
        accessibilityLabel={this.props.accessibilityLabel}
      >
        <Text style={styles.buttonText} adjustsFontSizeToFit>
          Scanning...
        </Text>
      </Pressable>
    );
  }
}

export default ScanningButton;
