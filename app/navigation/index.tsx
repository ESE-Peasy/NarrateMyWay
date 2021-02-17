import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import DefaultColors from '../constants/DefaultColors';

import MainScreen from '../screens/MainScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ScanningScreen from '../screens/ScanningScreen';

import { Header } from '../constants/Header';

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

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
      headerMode="float"
      initialRouteName="Scanning"
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={Header.options}
      />
      <Stack.Screen
        name="Scanning"
        component={ScanningScreen}
        options={Header.options}
      />
    </Stack.Navigator>
  );
}
