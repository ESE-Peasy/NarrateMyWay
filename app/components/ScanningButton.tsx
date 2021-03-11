import { Component } from 'react';

import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { setTheme } from '../src/themes';
import styles from './styles/ScanningButton.style';

import * as Speech from 'expo-speech';
import store from '../src/state/store';

class ScanningButton extends Component {
  componentDidMount() {
    setTimeout(() => {
      Speech.speak('Scanning for beacons');
    }, 2);
  }
  render() {
    const currentTheme = store.getState().themeReducer;
    const theme = setTheme(currentTheme.themeName);

    return (
      <Pressable
        style={[
          styles.container,
          {
            backgroundColor: theme.backgroundColor,
            borderColor: theme.borderColor
          }
        ]}
        android_ripple={{ color: theme.rippleColor }}
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
