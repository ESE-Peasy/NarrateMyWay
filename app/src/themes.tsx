import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Pressable } from 'react-native';
import { BackIcon, SettingsIcon } from '../components/HeaderIcons';
import { RootStackParamList } from '../types';

const monochromeTheme = {
  name: 'monochrome',
  backgroundColor: '#fff',
  borderColor: '#000',
  textColor: '#000',
  backgroundColorInverted: '#000',
  borderColorInverted: '#fff',
  textColorInverted: '#fff',
  headerBackgroundColor: '#000',
  headerTextColor: '#fff'
};

const defaultTheme = {
  name: 'default',
  backgroundColor: '#093f74',
  borderColor: '#fff',
  textColor: '#fff',
  backgroundColorInverted: '#fff',
  borderColorInverted: '#093f74',
  textColorInverted: '#093f74',
  headerBackgroundColor: '#093f74',
  headerTextColor: '#fff'
};

const highContrastTheme = {
  name: 'highContrast',
  backgroundColor: '#000',
  borderColor: '#eeee66',
  textColor: '#eeee66',
  backgroundColorInverted: '#eeee66',
  borderColorInverted: '#000',
  textColorInverted: '#000',
  headerBackgroundColor: '#000',
  headerTextColor: '#eeee66'
};

function setTheme(
  themeName: string,
  navigation:
    | StackNavigationProp<RootStackParamList, 'Main'>
    | StackNavigationProp<RootStackParamList, 'Settings'>
    | StackNavigationProp<RootStackParamList, 'Scanning'>
    | undefined,
  routeName: string
) {
  let theme = defaultTheme;
  if (themeName == 'monochrome') {
    theme = monochromeTheme;
  } else if (themeName == 'highContrast') {
    theme = highContrastTheme;
  } else {
    theme = defaultTheme;
  }
  if (navigation) {
    if (routeName == 'Main' || routeName == 'Scanning') {
      React.useEffect(() => {
        navigation.setOptions({
          headerStyle: { backgroundColor: theme.headerBackgroundColor },
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: theme.headerTextColor
          },
          headerLeft: () => {},
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Settings')}>
              <SettingsIcon theme={theme} />
            </Pressable>
          )
        });
      });
    } else {
      React.useEffect(() => {
        navigation.setOptions({
          headerStyle: { backgroundColor: theme.headerBackgroundColor },
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: theme.headerTextColor
          },
          headerRight: () => {},
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <BackIcon theme={theme} />
            </Pressable>
          )
        });
      });
    }
  }
  return theme;
}

export { defaultTheme, monochromeTheme, highContrastTheme, setTheme };
