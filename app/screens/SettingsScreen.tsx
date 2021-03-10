import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { HorizontalSeparator } from '../components/Separators';
import DefaultColors from '../constants/DefaultColors';

import { RootStackParamList } from '../types';

let color1 = '#000';
let color2 = '#fff';

export default function SettingsScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Settings'>) {
  const [currentTheme, setCurrentTheme] = React.useState('default');

  const setTheme = () => {
    if (currentTheme == 'theme1') {
      color1 = '#fff';
      color2 = '#000';
      setCurrentTheme('theme2');
    } else if (currentTheme == 'theme2') {
      color1 = '#000';
      color2 = '#fff';
      setCurrentTheme('default');
    } else {
      color1 = '#333';
      color2 = '#999';
      setCurrentTheme('theme1');
    }
  };

  console.log(currentTheme);
  const updateTheme = async () => {
    try {
      if (currentTheme == 'theme1') {
        await AsyncStorage.setItem('theme', 'theme2');
        setTheme();
      } else if (currentTheme == 'theme2') {
        await AsyncStorage.setItem('theme', 'default');
        setTheme();
      } else {
        await AsyncStorage.setItem('theme', 'theme1');
        setTheme();
      }
    } catch (e) {
      console.log('error: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <HorizontalSeparator />
      <Pressable
        style={[
          styles.button,
          { backgroundColor: color1, borderColor: color2 }
        ]}
        android_ripple={DefaultColors.rippleColor}
        onPress={updateTheme}
      >
        <Text
          style={[styles.buttonText, { color: color2 }]}
          adjustsFontSizeToFit
        >
          Tap to change colour scheme
        </Text>
      </Pressable>
      <TouchableOpacity onPress={() => navigation.replace('Main')}>
        <Text>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    borderWidth: 2
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20
  },
  buttonText: {
    fontSize: 42,
    textAlign: 'center'
  }
});
