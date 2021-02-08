import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import BeaconInfo from '../components/BeaconInfo';
import LargeButton from '../components/LargeButton';
import { HorizontalSeparator } from '../components/Separators';

import { View } from '../components/Themed';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <LargeButton>Tap here to repeat</LargeButton>
      <HorizontalSeparator />
      <BeaconInfo type="Point of Interest " place="Cafe " />
      <HorizontalSeparator />
      <LargeButton>Tap here for more info</LargeButton>
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
