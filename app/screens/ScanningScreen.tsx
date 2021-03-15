import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import ScanningButton from '../components/ScanningButton';
import { RootStackParamList } from '../types';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Beacon, Theme } from '../src/state/types';
import { setTheme } from '../src/themes';
import store from '../src/state/store';
import { useRoute } from '@react-navigation/core';

function ScanningScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Scanning'>) {
  const currentTheme = store.getState().themeReducer;
  const theme = setTheme(currentTheme.themeName, navigation, useRoute().name);

  return (
    <View style={styles.container}>
      <ScanningButton
        theme={theme}
        accessibilityLabel="Currently scanning for beacons near you"
      />
    </View>
  );
}

const mapStateToProps = (
  state: { beaconStateReducer: Beacon; themeReducer: Theme },
  ownProps: { navigation: StackNavigationProp<RootStackParamList, 'Scanning'> }
) => {
  const beaconName = state.beaconStateReducer.beaconName;
  if (beaconName != undefined) {
    ownProps.navigation.replace('Main');
  }
  return {
    state
  };
};

export default connect(mapStateToProps)(ScanningScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
