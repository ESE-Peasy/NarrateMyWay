import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HorizontalSeparator } from '../components/Separators';

import { RootStackParamList } from '../types';
import { useDispatch } from 'react-redux';
import { themeUpdated } from '../src/state/themes/actions';

import { setTheme } from '../src/themes';

import store from '../src/state/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchTheme from '../components/SwitchTheme';
import * as Speech from 'expo-speech';
import { useRoute } from '@react-navigation/core';

export default function SettingsScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Settings'>) {
  const currentSetTheme = store.getState().themeReducer;
  const [currentTheme, setCurrentTheme] = React.useState(
    currentSetTheme.themeName
  );

  const route = useRoute();
  const theme = setTheme(currentTheme, navigation, route.name);

  const dispatch = useDispatch();

  const updateAndSetTheme = (themeName: string) => {
    dispatch(themeUpdated(themeName));
    setCurrentTheme(themeName);
    Speech.speak(themeName);
    AsyncStorage.setItem('theme', themeName);
  };

  const updateTheme = async () => {
    try {
      switch (currentTheme) {
        case 'monochrome':
          updateAndSetTheme('highContrast');
          break;
        case 'highContrast':
          updateAndSetTheme('default');
          break;
        default:
          updateAndSetTheme('monochrome');
      }
    } catch (e) {
      console.log('error: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Tap below to try out different themes:</Text>
      <HorizontalSeparator />
      <SwitchTheme theme={theme} onPress={updateTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20
  }
});
