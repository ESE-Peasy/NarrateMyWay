import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HorizontalSeparator } from '../components/Separators';
import DefaultColors from '../constants/DefaultColors';

import { RootStackParamList } from '../types';
import { useDispatch } from 'react-redux';
import { themeUpdated } from '../src/state/themes/actions';

import { defaultTheme, setTheme } from '../src/themes';

import store from '../src/state/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Settings'>) {
  const currentSetTheme = store.getState().themeReducer;
  const [currentTheme, setCurrentTheme] = React.useState(
    currentSetTheme.themeName
  );
  let theme = setTheme(currentTheme);

  const dispatch = useDispatch();

  const updateAndSetTheme = (themeName: string) => {
    dispatch(themeUpdated(themeName));
    setCurrentTheme(themeName);
    theme = setTheme(themeName);
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
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: theme.backgroundColor,
            borderColor: theme.borderColor,
            width: `95%`
          }
        ]}
        android_ripple={DefaultColors.rippleColor}
        onPress={updateTheme}
      >
        <Text
          style={[styles.buttonText, { color: theme.textColor }]}
          adjustsFontSizeToFit
        >
          {theme.name}
        </Text>
      </Pressable>
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
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});
