import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DefaultColors from './constants/DefaultColors';
import store from './src/state/store';
import checkAndGetAllPermissions from './src/permissions';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';

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
