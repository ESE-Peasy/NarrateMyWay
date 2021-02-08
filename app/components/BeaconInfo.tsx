import { Component } from 'react';

import * as React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles/BeaconInfo.style';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { VerticalSeparator } from './Separators';

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

const PlaceIcon = () => (
  <Pressable
    style={styles.placeIconContainer}
    android_ripple={{ color: '#000', borderless: true, radius: 48 }}
  >
    <Ionicons name="cafe" style={styles.placeIcon} />
  </Pressable>
);

const PlaceText = ({ title }) => (
  <Pressable
    style={styles.placeTextContainer}
    android_ripple={{ color: '#fff' }}
  >
    <Text style={styles.placeText}>{title}</Text>
  </Pressable>
);

const TypeText = ({ title }) => (
  <Pressable style={styles.typeContainer} android_ripple={{ color: '#fff' }}>
    <Text style={styles.typeText}>{title}</Text>
  </Pressable>
);

export default BeaconInfo;
