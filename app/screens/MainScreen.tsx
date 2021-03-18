import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import BeaconInfo from '../components/BeaconInfo';
import LargeButton from '../components/LargeButton';
import { HorizontalSeparator } from '../components/Separators';

import { View } from '../components/Themed';
import { Beacon, Theme } from '../src/state/types';
import { RootStackParamList } from '../types';

import store from '../src/state/store';
import { setTheme } from '../src/themes';
import { useRoute } from '@react-navigation/native';

import * as Lookup from '../lookup';

function MainScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Main'>) {
  const currentTheme = store.getState().themeReducer;
  const theme = setTheme(currentTheme.themeName, navigation, useRoute().name);

  // Mock beacon here
  // const beacon = store.getState().beaconStateReducer as Beacon;
  const beacon: Beacon = {
    beaconName: 'nmw:1-1-1',
    beaconId: '00000000-0000-0000-0000-000000000001'
  };

  const [beaconDescription, setBeaconDescription] = React.useState('');
  const [beaconIcon, setBeaconIcon] = React.useState('');
  const [additionalAudio, setAdditionalAudio] = React.useState(
    'No additional information available'
  );

  Lookup.lookupBeacon(beacon).then((result: Lookup.LookupResult) => {
    switch (result._tag) {
      case 'Enriched':
        console.log('Enriched result', result);
        setBeaconDescription(result.name);
        setBeaconIcon(result.icon);
        setAdditionalAudio(result.description);
        break;
      case 'Simple':
        console.log('Simple result', result);
        setBeaconDescription(result.description);
        setBeaconIcon(result.icon);
        break;
      case 'LookupError':
        console.log('Error performing lookup');
    }
  });

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
        audio={additionalAudio}
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
