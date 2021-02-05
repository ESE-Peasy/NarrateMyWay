import * as React from 'react';
import { StyleSheet, Image, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import * as Speech from 'expo-speech';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Image
        accessible={true}
        source={require('../assets/images/icon.png')}
        style={{ width: 100, height: 100 }}
        accessibilityLabel="Accessible image"
      />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />

      <Button title="Tap to hear words" onPress={speak} />
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
