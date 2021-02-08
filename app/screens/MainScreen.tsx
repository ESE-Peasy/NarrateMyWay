import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Alert, Pressable, StyleSheet, Button } from 'react-native';

import { Text, View } from '../components/Themed';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <LargeButton title="Tap here to repeat"></LargeButton>
      <HorizontalSeparator />
      <PointOfInterestText title="Point of Interest "></PointOfInterestText>
      <View style={styles.placeContainer}>
        <LocationIcon></LocationIcon>
        <VerticalSeparator />
        <LocationText title="Cafe "></LocationText>
      </View>
      <HorizontalSeparator />
      <LargeButton title="Tap here for more info"></LargeButton>
    </View>
  );
}

const LocationIcon = () => (
  <Pressable
    style={styles.customIconContainer}
    android_ripple={{ color: '#000', borderless: true, radius: 48 }}
  >
    <Ionicons name="cafe" style={styles.customIcon} />
  </Pressable>
);

const LocationText = ({ title }) => (
  <Pressable
    style={styles.locationTextContainer}
    android_ripple={{ color: '#fff' }}
  >
    <Text style={styles.locationText}>{title}</Text>
  </Pressable>
);

const HorizontalSeparator = () => (
  <View
    style={styles.separator}
    lightColor="#eee"
    darkColor="rgba(255,255,255,0.1)"
  />
);

const VerticalSeparator = () => (
  <View
    style={styles.verticalSeparator}
    lightColor="#eee"
    darkColor="rgba(255,255,255,0.1)"
  />
);

const LargeButton = ({ title }) => (
  <Pressable
    style={styles.largeButtonContainer}
    android_ripple={{ color: '#fff' }}
    onPress={() => {
      // Triggered when the user taps on the button
      console.log('Test onPress');
    }}
    onPressOut={() => {
      // Triggered when user removes their finger
      console.log('Test onPressOut');
    }}
    onLongPress={() => {
      // Triggered when the user presses and holds for longer than 500ms
      // Can customise the duration by setting delayLongPress
      console.log('Test onLongPress');
    }}
  >
    <Text style={styles.largeButtonText}>{title}</Text>
  </Pressable>
);

const PointOfInterestText = ({ title }) => (
  <Pressable style={styles.poiContainer} android_ripple={{ color: '#fff' }}>
    <Text style={styles.poiText}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%'
  },
  verticalSeparator: {
    marginVertical: 10,
    // height: ,
    width: 20
  },
  largeButtonContainer: {
    elevation: 8,
    backgroundColor: '#093f74',
    // borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 100,
    // paddingHorizontal: 120,
    width: '100%',
    height: '30%'
  },
  largeButtonText: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    justifyContent: 'center',
    textAlign: 'center'
  },
  poiContainer: {
    elevation: 8,
    backgroundColor: '#ff9900',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
    paddingHorizontal: 20
  },
  poiText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  placeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  customIconContainer: {
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderColor: '#000',
    borderWidth: 1,
    padding: 15,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  customIcon: {
    fontSize: 60,
    textAlign: 'center',
    alignSelf: 'center'
  },
  locationTextContainer: {
    backgroundColor: '#009688',
    elevation: 8,
    borderRadius: 50,
    // padding: 20,
    paddingHorizontal: 70,
    paddingVertical: 20
  },
  locationText: {
    fontSize: 42,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});
