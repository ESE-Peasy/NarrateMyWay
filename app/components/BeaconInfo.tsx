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
  constructor(props) {
    super(props);
    this.state = {
      prev_description: ''
    };
  }

  componentDidUpdate() {
    if (this.state.prev_description == this.props.description) {
      console.log('Description has not changed');
    } else {
      console.log('Description has changed');
      Speech.speak(this.props.audio);
      this.setState({ prev_description: this.props.description });
    }
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
      Speech.speak(audio);
    }}
  >
    <Text style={styles.placeText} adjustsFontSizeToFit>
      {description}
    </Text>
  </Pressable>
);

export default BeaconInfo;
