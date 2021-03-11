import { Component } from 'react';

import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { defaultTheme, setTheme } from '../src/themes';
import styles from './styles/ScanningButton.style';

import * as Speech from 'expo-speech';
import DefaultColors from '../constants/DefaultColors';

let theme = defaultTheme;
class ScanningButton extends Component {
  componentDidMount() {
    setTimeout(() => {
      Speech.speak('Scanning for beacons');
    }, 2);
  }
  render() {
    theme = setTheme(this.props.theme);

    return (
      <Pressable
        style={[
          styles.container,
          { backgroundColor: theme.color1, borderColor: theme.color2 }
        ]}
        android_ripple={DefaultColors.rippleColor}
        onPress={() => {
          Speech.speak('Scanning for beacons');
        }}
        accessible={true}
        accessibilityLabel={this.props.accessibilityLabel}
      >
        <Text
          style={[styles.text, { color: theme.color2 }]}
          adjustsFontSizeToFit
        >
          Scanning...
        </Text>
      </Pressable>
    );
  }
}

export default ScanningButton;
