import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DefaultColors from './constants/DefaultColors';
import store from './state/store';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';

const scanForBeacons = () => {
  console.log('Scanning...');
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  scanForBeacons();

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
