import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import BeaconInfo from '../components/BeaconInfo';
import LargeButton from '../components/LargeButton';
import { HorizontalSeparator } from '../components/Separators';
import Storage from '../storage';

import { View } from '../components/Themed';
import { Beacon, Theme } from '../src/state/types';
import { RootStackParamList } from '../types';

import store from '../src/state/store';
import { setTheme } from '../src/themes';
import { useRoute } from '@react-navigation/native';

// Setup storage once
const storage = new Storage();
storage.clearStorage();
storage.createTable();

function MainScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Main'>) {
  const currentTheme = store.getState().themeReducer;
  const theme = setTheme(currentTheme.themeName, navigation, useRoute().name);

  const beacon = store.getState().beaconStateReducer as Beacon;
  let code = '';
  if (beacon.beaconName) {
    code = beacon.beaconName.split(':')[1];
  }

  const [beaconDescription, setBeaconDescription] = React.useState('');
  const [beaconIcon, setBeaconIcon] = React.useState('');

  function setBeaconData(codeDescription: String, codeEmblem: String) {
    setBeaconDescription(codeDescription);
    setBeaconIcon(codeEmblem);
  }

  if (code != '') {
    storage.lookupDataForNMWCode(code, setBeaconData);
  }

  let audioSnippet = '';
  if (beaconDescription != '') {
    audioSnippet = beaconDescription + ' located';
  }

  return (
    <View style={styles.container}>
      <LargeButton
        theme={theme}
        accessibilityLabel="Button to repeat the previous audio output"
        audio={audioSnippet}
      >
        Tap to repeat
      </LargeButton>
      <HorizontalSeparator />
      <BeaconInfo
        theme={theme}
        description={beaconDescription}
        icon={beaconIcon}
        audio={audioSnippet}
      />
      <HorizontalSeparator />
      <LargeButton
        theme={theme}
        accessibilityLabel="Button for more information"
        audio="No additional information available"
      >
        Tap for more info
      </LargeButton>
    </View>
  );
}

const mapStateToProps = (
  state: { beaconStateReducer: Beacon; themeReducer: Theme },
  ownProps: { navigation: StackNavigationProp<RootStackParamList, 'Main'> }
) => {
  const beaconName = state.beaconStateReducer.beaconName;
  if (beaconName == undefined) {
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
