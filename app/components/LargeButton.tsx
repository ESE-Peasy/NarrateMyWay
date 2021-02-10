import { Component } from 'react';

import * as React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles/LargeButton.style';

class LargeButton extends Component {
  render() {
    return (
      <Pressable
        style={styles.largeButtonContainer}
        android_ripple={{ color: '#fff' }}
        onPress={() => {
          // Triggered when the user taps on the button
          console.log('Test onPress');
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
        <Text style={styles.largeButtonText} adjustsFontSizeToFit>
          {this.props.children}
        </Text>
      </Pressable>
    );
  }
}

export default LargeButton;
