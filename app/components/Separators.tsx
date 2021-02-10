import { Component } from 'react';

import * as React from 'react';
import { View } from 'react-native';
import styles from './styles/Separators.style';

class HorizontalSeparator extends Component {
  render() {
    return <View style={styles.horizontalSeparator} />;
  }
}

class VerticalSeparator extends Component {
  render() {
    return <View style={styles.verticalSeparator} />;
  }
}

export { HorizontalSeparator, VerticalSeparator };
