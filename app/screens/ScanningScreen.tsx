import * as React from 'react';
import { Button, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import ScanningButton from '../components/ScanningButton';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

export default function ScanningScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Scanning'>) {
  return (
    <View style={styles.container}>
      <ScanningButton accessibilityLabel="Currently scanning for beacons near you" />
      <Button
        // TODO: Remove this when we navigate based on scanning state
        title="Go to Main Screen"
        onPress={() => navigation.replace('Main')}
      ></Button>
      <Button title="Beacon Detected" onPress={() => {}}></Button>
      <Button title="Beacon Out Of Range" onPress={() => {}}></Button>
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
