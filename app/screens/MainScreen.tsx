import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import BeaconInfo from '../components/BeaconInfo';
import LargeButton from '../components/LargeButton';
import { HorizontalSeparator } from '../components/Separators';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
