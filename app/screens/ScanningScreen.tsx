import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import ScanningButton from '../components/ScanningButton';

export default function ScanningScreen() {
  return (
    <View style={styles.container}>
      <ScanningButton accessibilityLabel="Scanning" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
