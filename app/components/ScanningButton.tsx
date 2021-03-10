import { Component } from 'react';

import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { theme1, theme2, themeDefault } from './styles/ScanningButton.style';

import * as Speech from 'expo-speech';
import DefaultColors from '../constants/DefaultColors';

class ScanningButton extends Component {
  componentDidMount() {
    setTimeout(() => {
      Speech.speak('Scanning for beacons');
    }, 2);
  }
  render() {
    let theme = themeDefault;
    if (this.props.theme == 'theme1') {
      theme = theme1;
    } else if (this.props.theme == 'theme2') {
      theme = theme2;
    }
    // console.log(theme);
    return (
      <Pressable
        style={theme.container}
        android_ripple={DefaultColors.rippleColor}
        onPress={() => {
          Speech.speak('Scanning for beacons');
        }}
        accessible={true}
        accessibilityLabel={this.props.accessibilityLabel}
      >
        <Text style={theme.text} adjustsFontSizeToFit>
          Scanning...
        </Text>
      </Pressable>
    );
  }
}

export default ScanningButton;
