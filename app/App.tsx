import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DefaultColors from './constants/DefaultColors';
import store from './src/state/store';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { Platform, Alert } from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  Permission,
  requestMultiple,
  checkMultiple
} from 'react-native-permissions';
import RNExitApp from 'react-native-exit-app';

function checkAllPermissions(perms: Permission[]) {
  const reqs = checkMultiple(perms).then((statuses) => {
    const reqs: Permission[] = [];
    for (let i = 0; i < perms.length; i++) {
      if (statuses[perms[i]] == 'denied' || statuses[perms[i]] == 'blocked') {
        reqs.push(perms[i]);
      }
    }
    return reqs;
  });
  return reqs;
}

const checkAndGetAllPermissions = () => {
  let perms: Permission[] = [];
  if (Platform.OS == 'android') {
    perms = [
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
    ];
  } else if (Platform.OS == 'ios') {
    console.log('ios');
    perms = [
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
    ];
  }
  checkAllPermissions(perms).then((reqs) => {
    if (reqs.length > 0) {
      requestMultiple(reqs);
    }
  });
  checkAllPermissions(perms).then((reqs) => {
    console.log('here');
    if (reqs.length > 0) {
      Alert.alert(
        'Permission Denied',
        'You must allow location permissions to use this app',
        [
          {
            text: 'Exit',
            onPress: () => RNExitApp.exitApp()
          }
        ]
      );
    }
  });
};

export default function App() {
  checkAndGetAllPermissions();
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar
            backgroundColor={DefaultColors.customTheme.colors.background}
            style="light"
          />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
