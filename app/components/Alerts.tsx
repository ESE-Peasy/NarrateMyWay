import { Alert } from 'react-native';
import * as Speech from 'expo-speech';

export function packDownloadedSuccessAlert(packName: string) {
  Speech.speak(`Successfully downloaded expansion pack for ${packName}`);
  Alert.alert(
    'Expansion Pack Downloaded!',
    `Successfully downloaded expansion pack for ${packName}`
  );
}

export function internetDisabledAlert() {
  Speech.speak(
    'Internet disabled. Please enable to download an expansion pack located near you'
  );
  Alert.alert(
    'Internet Disabled!',
    'Please enable to download an expansion pack located near you'
  );
}
