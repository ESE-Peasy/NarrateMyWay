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
import { useDispatch } from 'react-redux';
import { themeUpdated } from '../src/state/themes/actions';

import { defaultTheme, setTheme } from '../src/themes';

import store from '../src/state/store';
import { Theme } from '../src/state/types';

let theme = defaultTheme;

export default function SettingsScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Settings'>) {
  const currentSetTheme = store.getState().themeReducer as Theme;
  const [currentTheme, setCurrentTheme] = React.useState(
    currentSetTheme.themeName
  );

  const dispatch = useDispatch();

  const updateTheme = async () => {
    try {
      if (currentTheme == 'monochrome') {
        dispatch(themeUpdated('highContrast'));
        setCurrentTheme('highContrast');
        theme = setTheme('highContrast');
      } else if (currentTheme == 'highContrast') {
        dispatch(themeUpdated('default'));
        setCurrentTheme('default');
        theme = setTheme('default');
      } else {
        dispatch(themeUpdated('monochrome'));
        setCurrentTheme('monochrome');
        theme = setTheme('monochrome');
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
