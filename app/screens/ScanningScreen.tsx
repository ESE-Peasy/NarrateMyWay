import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import ScanningButton from '../components/ScanningButton';

import * as Speech from 'expo-speech';

export default function ScanningScreen() {
  return (
    <View style={styles.container}>
      <ScanningButton accessibilityLabel="Scanning" />
    </View>
  );
}

const speak = () => {
  const date = new Date();
  const time = date.getHours() + ' ' + date.getMinutes();
  const words = 'I am now saying some words at ';
  Speech.speak(words + time);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
});
