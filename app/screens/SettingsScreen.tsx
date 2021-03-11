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

import {
  monochromeTheme,
  defaultTheme,
  highContrastTheme
} from '../src/themes';

let theme = defaultTheme;

export default function SettingsScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Settings'>) {
  const [currentTheme, setCurrentTheme] = React.useState('default');

  AsyncStorage.getItem('theme').then((result) => {
    console.log(result);
    setTheme(result);
  });

  const setTheme = (themeOption: string) => {
    if (themeOption == 'monochrome') {
      theme = monochromeTheme;
    } else if (themeOption == 'highContrast') {
      theme = highContrastTheme;
    } else {
      theme = defaultTheme;
    }
    setCurrentTheme(themeOption);
  };

  const updateTheme = async () => {
    try {
      if (currentTheme == 'monochrome') {
        await AsyncStorage.setItem('theme', 'highContrast');
        setTheme('highContrast');
      } else if (currentTheme == 'highContrast') {
        await AsyncStorage.setItem('theme', 'default');
        setTheme('default');
      } else {
        await AsyncStorage.setItem('theme', 'monochrome');
        setTheme('monochrome');
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
          { backgroundColor: theme.color1, borderColor: theme.color2 }
        ]}
        android_ripple={DefaultColors.rippleColor}
        onPress={updateTheme}
      >
        <Text
          style={[styles.buttonText, { color: theme.color2 }]}
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
