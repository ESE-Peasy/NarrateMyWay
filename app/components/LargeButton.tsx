import { Component } from 'react';

import * as React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles/LargeButton.style';
import DefaultColors from '../constants/DefaultColors';

import * as Speech from 'expo-speech';
import { defaultTheme, setTheme } from '../src/themes';

import store from '../src/state/store';
import { Theme } from '../src/state/types';

let theme = defaultTheme;
class LargeButton extends Component {
  render() {
    const currentTheme = store.getState().themeReducer as Theme;

    theme = setTheme(currentTheme.themeName);
    return (
      <Pressable
        style={[
          styles.largeButtonContainer,
          { backgroundColor: theme.color1, borderColor: theme.color2 }
        ]}
        android_ripple={DefaultColors.rippleColor}
        onPress={() => {
          // Triggered when the user taps on the button
          Speech.speak(this.props.audio);
        }}
        onPressOut={() => {
          // Triggered when user removes their finger
          console.log('Test onPressOut');
        }}
        onLongPress={() => {
          // Triggered when the user presses and holds for longer than 500ms
          // Can customise the duration by setting delayLongPress
          console.log('Test onLongPress');
        }}
        accessible={true}
        accessibilityLabel={this.props.accessibilityLabel}
      >
        <Text
          style={[styles.largeButtonText, { color: theme.color2 }]}
          adjustsFontSizeToFit
        >
          {this.props.children}
        </Text>
      </Pressable>
    );
  }
}

export default LargeButton;
