import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import BeaconInfo from '../components/BeaconInfo';
import LargeButton from '../components/LargeButton';
import { HorizontalSeparator } from '../components/Separators';
import Storage from '../storage';

import { View } from '../components/Themed';
import { Beacon } from '../src/state/types';
import { RootStackParamList } from '../types';

function MainScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Main'>) {
  // Test database functionality
  const storage = new Storage();
  storage.clearStorage();
  storage.createTable();

  function printLookupResult(codeDescription: String, codeEmblem: String) {
    console.log(codeDescription);
    console.log(codeEmblem);
  }

  storage.lookupDataForNMWCode('1-1-1', printLookupResult);

  return (
    <View style={styles.container}>
      <LargeButton accessibilityLabel="Tap here to repeat the previous audio output">
        Tap to repeat
      </LargeButton>
      <HorizontalSeparator />
      <BeaconInfo type="Point of Interest " place="Cafe " />
      <HorizontalSeparator />
      <LargeButton accessibilityLabel="Tap here for more information">
        Tap for more info
      </LargeButton>
    </View>
  );
}

const mapStateToProps = (
  state: Beacon,
  ownProps: { navigation: StackNavigationProp<RootStackParamList, 'Main'> }
) => {
  console.log(state);
  if (!state.beaconName) {
    ownProps.navigation.replace('Scanning');
  }
  return { state };
};

export default connect(mapStateToProps)(MainScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
