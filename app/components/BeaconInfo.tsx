import { Component } from 'react';

import * as React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles/BeaconInfo.style';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { HorizontalSeparator, VerticalSeparator } from './Separators';

import * as Speech from 'expo-speech';

class BeaconInfo extends Component {
  render() {
    return (
      <View style={styles.beaconInfoContainer}>
        <TypeText title={this.props.type}></TypeText>
        <HorizontalSeparator />
        <View style={styles.placeContainer}>
          <PlaceIcon></PlaceIcon>
          <VerticalSeparator />
          <PlaceText title={this.props.place}></PlaceText>
        </View>
      </View>
    );
  }
}

const TypeText = ({ title }) => (
  <Pressable
    style={styles.typeContainer}
    android_ripple={{ color: '#fff' }}
    accessible={true}
    onPress={() => {
      Speech.speak('A point of interest has been located near you');
    }}
  >
    <Text style={styles.typeText} numberOfLines={1} adjustsFontSizeToFit>
      {title}
    </Text>
  </Pressable>
);

const PlaceIcon = () => (
  <Ionicons
    name="cafe"
    style={styles.placeIcon}
    size={80}
    accessible={true}
    accessibilityLabel="Icon of a cafe"
    accessibilityHint="test"
    adjustsFontSizeToFit
  />
);

const PlaceText = ({ title }) => (
  <Pressable
    style={styles.placeTextContainer}
    android_ripple={{ color: '#fff' }}
    accessible={true}
    onPress={() => {
      Speech.speak('A cafe has been located near you');
    }}
  >
    <Text style={styles.placeText} numberOfLines={1} adjustsFontSizeToFit>
      {title}
    </Text>
  </Pressable>
);

export default BeaconInfo;
