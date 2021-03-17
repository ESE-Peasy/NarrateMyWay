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

import store from '../src/state/store';
import * as expansionData from '../expansion1.json';

// Setup storage once
const storage = new Storage();
storage.clearStorage();
storage.createTable();
storage.parseExpansionPack(expansionData);
storage.printExpansionPack();
storage.deleteExpansionPack(1);
storage.printExpansionPack();

function MainScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Main'>) {
  const beacon = store.getState() as Beacon;
  let code = '';
  if (beacon.beaconName) {
    code = beacon.beaconName.split(':')[1];
  }

  const [beaconDescription, setBeaconDescription] = React.useState('');
  const [beaconIcon, setBeaconIcon] = React.useState('');

  function setBeaconData(codeDescription: String, codeEmblem: String) {
    setBeaconDescription(codeDescription);
    setBeaconIcon(codeEmblem);
    // console.log(codeDescription);
    // console.log(codeEmblem);
  }

  function printUUIDData(name: String) {
    console.log(name);
    console.log('this is the output.');
  }

  if (code != '') {
    storage.lookupDataForNMWCode(code, setBeaconData);
    // storage.getUUIDData(code, printUUIDData);
  }

  let audioSnippet = '';
  if (beaconDescription != '') {
    audioSnippet = beaconDescription + ' located';
  }
  storage.parseExpansionPack();

  return (
    <View style={styles.container}>
      <LargeButton
        accessibilityLabel="Button to repeat the previous audio output"
        audio={audioSnippet}
      >
        Tap to repeat
      </LargeButton>
      <HorizontalSeparator />
      <BeaconInfo
        description={beaconDescription}
        icon={beaconIcon}
        audio={audioSnippet}
      />
      <HorizontalSeparator />
      <LargeButton
        accessibilityLabel="Button for more information"
        audio="No additional information available"
      >
        Tap for more info
      </LargeButton>
    </View>
  );
}

const mapStateToProps = (
  state: Beacon,
  ownProps: { navigation: StackNavigationProp<RootStackParamList, 'Main'> }
) => {
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
