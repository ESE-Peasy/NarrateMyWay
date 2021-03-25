import { Text, Alert, Pressable } from 'react-native';
import * as Speech from 'expo-speech';
import styles from './styles/Alerts.style';
import React from 'react';

export function packDownloadedSuccessAlert(packName: string) {
  Speech.speak(`Successfully downloaded expansion pack for ${packName}`);
  Alert.alert(
    'Expansion Pack Downloaded!',
    `Successfully downloaded expansion pack for ${packName}`
  );
}

export function internetDisabledAlert() {
  Speech.speak(
    'Internet disabled. Please enable to download an expansion pack which has been located near you'
  );
  Alert.alert(
    'Internet Disabled!',
    'Please enable to download an expansion pack located near you'
  );
}

export const Banner = () => (
  <Pressable
    style={styles.banner}
    onPress={() =>
      Speech.speak(
        'Internet is disabled. Please enable internet to download Expansion Packs.'
      )
    }
  >
    <Text style={styles.bannerText}>
      Internet is disabled. Please enable internet to download Expansion Packs.
    </Text>
  </Pressable>
);
