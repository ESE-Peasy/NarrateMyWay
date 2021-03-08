import { Component } from 'react';

import * as React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './styles/BeaconInfo.style';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { VerticalSeparator } from './Separators';

import * as Speech from 'expo-speech';
import DefaultColors from '../constants/DefaultColors';

class BeaconInfo extends Component {
  componentDidMount() {
    setTimeout(() => {
      Speech.speak(this.props.audio);
    }, 2);
  }

  render() {
    return (
      <View style={styles.beaconInfoContainer}>
        <View style={styles.placeContainer}>
          <PlaceIcon icon={this.props.icon}></PlaceIcon>
          <VerticalSeparator />
          <PlaceText
            description={this.props.description}
            audio={this.props.audio}
          ></PlaceText>
        </View>
      </View>
    );
  }
}

const PlaceIcon = ({ icon }) => (
  <Ionicons
    name={icon}
    style={styles.placeIcon}
    size={80}
    accessible={true}
    accessibilityLabel={'Icon of a ' + icon}
    adjustsFontSizeToFit
  />
);

const PlaceText = ({ description, audio }) => (
  <Pressable
    style={styles.placeTextContainer}
    android_ripple={DefaultColors.rippleColor}
    accessible={true}
    onPress={() => {
      console.log('here');
      Speech.speak(audio);
    }}
  >
    <Text style={styles.placeText} numberOfLines={1} adjustsFontSizeToFit>
      {description}
    </Text>
  </Pressable>
);

export default BeaconInfo;
