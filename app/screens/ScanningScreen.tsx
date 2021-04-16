import * as React from 'react';
import { StyleSheet, Alert, Platform } from 'react-native';

import { View } from '../components/Themed';
import ScanningButton from '../components/ScanningButton';
import { RootStackParamList } from '../types';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Beacon, Theme } from '../src/state/types';
import { setTheme } from '../src/themes';
import store from '../src/state/store';
import { useRoute } from '@react-navigation/core';
import { fetchExpansionPackMetadata } from '../src/meta-fetcher';
import NetInfo from '@react-native-community/netinfo';
import {
  InternetDisabledBanner,
  LocationDisabledBanner
} from '../components/Alerts';
import LocationEnabler from 'react-native-location-enabler';

const {
  PRIORITIES: { HIGH_ACCURACY },
  addListener,
  checkSettings
} = LocationEnabler;

function ScanningScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Scanning'>) {
  const currentTheme = store.getState().themeReducer;
  const theme = setTheme(currentTheme.themeName, navigation, useRoute().name);

  const [internetStateDisabled, setInternetStateDisabled] = React.useState(
    false
  );

  const [locationStateDisabled, setLocationStateDisabled] = React.useState(
    false
  );

  React.useEffect(() => {
    // Initialise internetStateDisabled and event listener the first time
    // the user opens ScanningScreen
    NetInfo.fetch().then((state) => {
      setInternetStateDisabled(!state.isConnected);
    });
    const unsubscribeInternetListener = NetInfo.addEventListener((state) => {
      if (!state.isConnected != internetStateDisabled) {
        setInternetStateDisabled(!state.isConnected);
      }
    });

    // Initialise listener for location change events
    const locationListener = addListener(({ locationEnabled }) => {
      if (locationEnabled) {
        setLocationStateDisabled(false);
        return;
      }
      if (!locationEnabled && !locationEnabled != locationStateDisabled) {
        // If location is disabled, present an alert to the user
        setLocationStateDisabled(!locationEnabled);
      }
    });

    const locationConfig = {
      priority: HIGH_ACCURACY,
      alwaysShow: true,
      needBle: true
    };

    checkSettings(locationConfig);

    return () => {
      // Unsubscribe the listeners when the screen is unmounted
      unsubscribeInternetListener();
      locationListener.remove();
    };
  });

  const internetDisabledBanner = <InternetDisabledBanner />;
  const locationDisabledBanner = <LocationDisabledBanner />;
  const nothing = <View></View>;

  return (
    <View style={styles.container}>
      {internetStateDisabled ? internetDisabledBanner : nothing}
      {locationStateDisabled ? locationDisabledBanner : nothing}
      <View style={styles.scanningButtonContainer}>
        <ScanningButton
          theme={theme}
          accessibilityLabel="Currently scanning for beacons near you"
        />
      </View>
    </View>
  );
}

const mapStateToProps = (
  state: { beaconStateReducer: Beacon; themeReducer: Theme },
  ownProps: { navigation: StackNavigationProp<RootStackParamList, 'Scanning'> }
) => {
  const { beaconName, isExpansionPack, beaconId } = state.beaconStateReducer;
  if (!isExpansionPack && beaconName != undefined) {
    ownProps.navigation.replace('Main');
  } else if (isExpansionPack && beaconId != undefined) {
    fetchExpansionPackMetadata(beaconId);
  }
  return {
    state
  };
};

export default connect(mapStateToProps)(ScanningScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scanningButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
