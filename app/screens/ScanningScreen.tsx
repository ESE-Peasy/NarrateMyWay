import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import ScanningButton from '../components/ScanningButton';
import { RootStackParamList } from '../types';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Beacon } from '../src/state/types';

function ScanningScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Scanning'>) {
  return (
    <View style={styles.container}>
      <ScanningButton accessibilityLabel="Scanning" />
    </View>
  );
}

const mapStateToProps = (
  state: Beacon,
  ownProps: { navigation: StackNavigationProp<RootStackParamList, 'Scanning'> }
) => {
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
