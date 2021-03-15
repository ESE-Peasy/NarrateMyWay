import React from 'react';
import { Pressable } from 'react-native';
import { BackIcon, SettingsIcon } from '../components/HeaderIcons';

const monochromeTheme = {
  name: 'monochrome',
  backgroundColor: '#fff',
  borderColor: '#000',
  textColor: '#000',
  backgroundColorInverted: '#000',
  borderColorInverted: '#fff',
  textColorInverted: '#fff'
};

const defaultTheme = {
  name: 'default',
  backgroundColor: '#093f74',
  borderColor: '#fff',
  textColor: '#fff',
  backgroundColorInverted: '#fff',
  borderColorInverted: '#093f74',
  textColorInverted: '#093f74'
};

const highContrastTheme = {
  name: 'highContrast',
  backgroundColor: '#00f',
  borderColor: '#f00',
  textColor: '#f00',
  backgroundColorInverted: '#f00',
  borderColorInverted: '#00f',
  textColorInverted: '#00f'
};

function setTheme(themeName: string, navigation, routeName) {
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
          headerStyle: { backgroundColor: theme.backgroundColor },
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: theme.textColor
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
          headerStyle: { backgroundColor: theme.backgroundColor },
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: theme.textColor
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
