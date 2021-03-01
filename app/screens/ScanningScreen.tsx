import * as React from 'react';
import { Button, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import ScanningButton from '../components/ScanningButton';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { connect } from 'react-redux';

function ScanningScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Scanning'>) {
  return (
    <View style={styles.container}>
      <ScanningButton accessibilityLabel="Currently scanning for beacons near you" />
      <Button
        // TODO: Remove this when we navigate based on scanning state
        title="Go to Main Screen"
        onPress={() => navigation.replace('Main')}
      ></Button>
      <Button title="Beacon Detected" onPress={() => {}}></Button>
      <Button title="Beacon Out Of Range" onPress={() => {}}></Button>
    </View>
  );
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  if (state.beaconName) {
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
