import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import DefaultColors from '../constants/DefaultColors';

import MainScreen from '../screens/MainScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ScanningScreen from '../screens/ScanningScreen';
import checkAndGetAllPermissions from '../src/permissions';
import { BleManager } from 'react-native-ble-plx';

import scanForBeacons from '../src/ble';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themeUpdated } from '../src/state/themes/actions';
import store from '../src/state/store';
import { setTheme } from '../src/themes';
import { BackIcon, SettingsIcon } from '../components/HeaderIcons';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DefaultColors.customTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
checkAndGetAllPermissions();
const manager = new BleManager();

function RootNavigator() {
  scanForBeacons(manager);
  const dispatch = useDispatch();

  AsyncStorage.getItem('theme').then((themeName) => {
    dispatch(themeUpdated(themeName));
  });

  const currentTheme = store.getState().themeReducer;
  const theme = setTheme(currentTheme.themeName, undefined);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
      headerMode="float"
      initialRouteName="Scanning"
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          title: 'Narrate My Way',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: theme.headerTextColor
          },
          headerStyle: {
            backgroundColor: theme.headerBackgroundColor
          },
          headerLeft: () => {},
          headerRight: () => (
            <Pressable onPress={() => navigation.push('Settings')}>
              <SettingsIcon theme={theme} />
            </Pressable>
          )
        })}
      />
      <Stack.Screen
        name="Scanning"
        component={ScanningScreen}
        options={({ navigation }) => ({
          title: 'Narrate My Way',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: theme.headerTextColor
          },
          headerStyle: {
            backgroundColor: theme.headerBackgroundColor
          },
          headerLeft: () => {},
          headerRight: () => (
            <Pressable onPress={() => navigation.push('Settings')}>
              <SettingsIcon theme={theme} />
            </Pressable>
          )
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          title: 'Settings',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: theme.headerTextColor
          },
          headerStyle: {
            backgroundColor: theme.headerBackgroundColor
          },
          headerRight: () => {},
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <BackIcon theme={theme} />
            </Pressable>
          )
        })}
      />
    </Stack.Navigator>
  );
}
