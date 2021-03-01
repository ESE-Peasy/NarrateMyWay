import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import BeaconInfo from '../components/BeaconInfo';
import LargeButton from '../components/LargeButton';
import { HorizontalSeparator } from '../components/Separators';
import Storage from '../storage';

import { View } from '../components/Themed';
import { RootStackParamList } from '../types';

export default function MainScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'Main'>) {
  return (
    <View style={styles.container}>
      <LargeButton accessibilityLabel="Tap here to repeat the previous audio output">
        Tap to repeat
      </LargeButton>
      <HorizontalSeparator />
      <BeaconInfo type="Point of Interest " place="Cafe " />
      <HorizontalSeparator />
      <Button
        // TODO: Remove this when we navigate based on scanning state
        title="Go to Scanning Screen"
        onPress={() => navigation.replace('Scanning')}
      ></Button>
      <LargeButton accessibilityLabel="Tap here for more information">
        Tap for more info
      </LargeButton>
    </View>
  );
}

// Test database functionality
const storage = new Storage();
storage.createTable();

function printLookupResult(codeDescription:String){
  console.log(codeDescription)
}

storage.lookUpCodeDescription("1-1-1", printLookupResult);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
