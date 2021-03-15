import { BleManager, Device } from 'react-native-ble-plx';
import {
  beaconDetected,
  beaconOutOfRange
} from '../src/state/bluetooth/actions';
import { useDispatch } from 'react-redux';
import * as FileSystem from 'expo-file-system';

const THRESHOLD = -70; // in dB
const TIMEOUT = 2000; // in ms

const EXPANSION_PACK = 'nmw:1-exp-and';

const downloadCallback = (downloadProgress: {
  totalBytesWritten: number;
  totalBytesExpectedToWrite: number;
}) => {
  console.log(
    downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite
  );
};

async function downloadExpansion(device: Device) {
  console.log('Expand beacon found');
  const location = FileSystem.documentDirectory + device.id + '.txt';
  const present = await FileSystem.getInfoAsync(location);
  if (present.exists == true) {
    console.log(
      'But file already downloaded. If you want to delete the file go to:'
    );
    const file = await FileSystem.getContentUriAsync(location);
    console.log(file);
  } else {
    // Look up device url
    const downloadResumable = FileSystem.createDownloadResumable(
      'https://raw.githubusercontent.com/ESE-Peasy/NarrateMyWay/main/example_expansion_packs/expansion1.json',
      FileSystem.documentDirectory + device.id + '.txt',
      {},
      downloadCallback
    );
    try {
      const result = await downloadResumable.downloadAsync();
      if (result != undefined && result.uri) {
        console.log('Finished downloading to ', result.uri);
        const fileContent = await FileSystem.readAsStringAsync(result.uri);
        console.log('Finished reading file');
        console.log(fileContent);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

const scanForBeacons = (manager: BleManager) => {
  const dispatch = useDispatch();
  let devices: Device[] = [];

  setInterval(() => {
    devices = [];
    setTimeout(() => {
      if (devices.length > 0) {
        let closest = devices[0];
        for (const dev of devices) {
          if (dev.rssi && closest.rssi) {
            if (dev.rssi > closest.rssi) {
              closest = dev;
            }
          }
          if (closest.rssi && closest.name) {
            if (closest.rssi > THRESHOLD) {
              if (closest.name == EXPANSION_PACK) {
                downloadExpansion(closest);
              } else {
                dispatch(beaconDetected(closest.name, closest.id));
              }
            } else {
              dispatch(beaconOutOfRange());
            }
          }
        }
      } else {
        dispatch(beaconOutOfRange());
      }
    }, TIMEOUT);
  }, 2 * TIMEOUT);

  manager.startDeviceScan(null, null, async (error, device) => {
    if (error) {
      manager.stopDeviceScan();
      console.log(error.reason);
    }

    if (device && device.name && device.rssi) {
      if (device.name.startsWith('nmw')) {
        if (device.rssi > THRESHOLD) {
          devices.push(device);
        }
      }
    }
  });
};
export default scanForBeacons;
