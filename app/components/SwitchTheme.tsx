import { Component } from 'react';

import * as React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles/SwitchTheme.style';

class SwitchTheme extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: theme.backgroundColor,
            borderColor: theme.borderColor,
            width: `95%`
          }
        ]}
        onPress={this.props.onPress}
        accessible={true}
        accessibilityLabel="Switch theme"
      >
        <Text
          style={[styles.buttonText, { color: theme.textColor }]}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {theme.name}
        </Text>
      </Pressable>
    );
  }
}

export default SwitchTheme;
