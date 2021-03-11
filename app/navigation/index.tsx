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

import { BleManager } from 'react-native-ble-plx';

import scanForBeacons from '../src/ble';
import { Ionicons } from '@expo/vector-icons';

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

const manager = new BleManager();

function RootNavigator() {
  scanForBeacons(manager);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
      headerMode="float"
      initialRouteName="Scanning"
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation, route }) => ({
          title: 'Narrate My Way',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase'
          },
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Settings')}>
              <Ionicons
                name="settings-outline"
                style={{ color: '#fff', paddingRight: 10 }}
                size={35}
                // accessible={true}
                accessibilityLabel="Icon of a"
                // adjustsFontSizeToFit
              />
            </Pressable>
          )
        })}
      />
      <Stack.Screen
        name="Scanning"
        component={ScanningScreen}
        options={({ navigation, route }) => ({
          title: 'Narrate My Way',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase'
          },
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Settings')}>
              <Ionicons
                name="settings-outline"
                style={{ color: '#fff', paddingRight: 10 }}
                size={35}
                // accessible={true}
                accessibilityLabel="Icon of a"
                // adjustsFontSizeToFit
              />
            </Pressable>
          )
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation, route }) => ({
          title: 'Settings',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }
        })}
      />
    </Stack.Navigator>
  );
}
