import { Component } from 'react';

import * as React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles/BeaconInfo.style';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { VerticalSeparator } from './Separators';

import * as Speech from 'expo-speech';

class BeaconInfo extends Component {
  render() {
    return (
      <View style={styles.beaconInfoContainer}>
        <TypeText title={this.props.type}></TypeText>
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
    <Text style={styles.typeText}>{title}</Text>
  </Pressable>
);

const PlaceIcon = () => (
  <Pressable
    style={styles.placeIconContainer}
    android_ripple={{ color: '#000', borderless: true, radius: 48 }}
    accessible={true}
    accessibilityHint="Icon of a cafe"
    onPress={() => {
      Speech.speak('A cafe has been located near you');
    }}
  >
    <Ionicons name="cafe" style={styles.placeIcon} />
  </Pressable>
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
    <Text style={styles.placeText}>{title}</Text>
  </Pressable>
);

export default BeaconInfo;
