import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import DefaultColors from '../constants/DefaultColors';
import MainScreen from '../screens/MainScreen';
import ScanningScreen from '../screens/ScanningScreen';
import { BottomTabParamList, MainParamList, ScanningParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      tabBarOptions={{
        activeTintColor: DefaultColors.customTheme.colors.primary,
        inactiveBackgroundColor: DefaultColors.customTheme.colors.primary
      }}
    >
      <BottomTab.Screen
        name="Main"
        component={MainNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="Scanning"
        component={ScanningNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MainStack = createStackNavigator<MainParamList>();

function MainNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerTitle: 'Main Screen Title' }}
      />
    </MainStack.Navigator>
  );
}

const ScanningStack = createStackNavigator<ScanningParamList>();

function ScanningNavigator() {
  return (
    <ScanningStack.Navigator>
      <ScanningStack.Screen
        name="ScanningScreen"
        component={ScanningScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </ScanningStack.Navigator>
  );
}
