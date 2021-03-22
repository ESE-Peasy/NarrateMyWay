import { BleManager, Device } from 'react-native-ble-plx';
import {
  beaconDetected,
  beaconOutOfRange,
  expansionPackDetected
} from '../src/state/bluetooth/actions';
import { useDispatch } from 'react-redux';
import { Alert, Platform } from 'react-native';
import * as Speech from 'expo-speech';

const THRESHOLD = -100; // in dB
const TIMEOUT = 2000; // in ms

const EXPANSION_PACK = 'NMW:1-EXP-AND';

async function bluetoothDisabledAlert(manager: BleManager) {
  Speech.speak(
    'Bluetooth disabled. Bluetooth must be enabled for this app to work'
  );
  Alert.alert(
    'Bluetooth is disabled',
    'Bluetooth must be enabled for this application to work',
    [
      {
        text: 'OK',
        onPress: async () => {
          if (Platform.OS === 'android') {
            // On Android we can enable Bluetooth
            try {
              const newManager = await manager.enable('test');
              setListener(newManager);
              return newManager;
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    ],
    { cancelable: false }
  );
  return manager;
}

function setListener(manager: BleManager) {
  manager.onStateChange((state) => {
    if (state === 'PoweredOff') {
      manager.stopDeviceScan();
      bluetoothDisabledAlert(manager).then((newManager) => {
        manager = newManager;
        startScan(manager, []);
      });
    } else if (state === 'PoweredOn') {
      Speech.speak('Bluetooth enabled. Scanning for beacons');
      startScan(manager, []);
    }
  });
}

function startScan(manager: BleManager, devices: Device[]) {
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      manager.stopDeviceScan();
      console.log(error.reason);
      bluetoothDisabledAlert(manager).then((newManager) => {
        manager = newManager;
      });
    }

    if (device && device.name && device.rssi) {
      console.log(device.name);
      if (device.name.toUpperCase().startsWith('NMW:')) {
        // if (device.rssi > THRESHOLD) {
        devices.push(device);
        // }
      }
    }
  });
}

const scanForBeacons = (manager: BleManager) => {
  const dispatch = useDispatch();
  let devices: Device[] = [];

  manager.state().then((state) => {
    if (state === 'PoweredOff') {
      bluetoothDisabledAlert(manager).then((newManager) => {
        manager = newManager;
      });
    } else if (state === 'PoweredOn') {
      setListener(manager);
    }
  });

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
              if (closest.name.toUpperCase() == EXPANSION_PACK) {
                dispatch(expansionPackDetected(closest.name, closest.id));
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

  startScan(manager, devices);
};
export default scanForBeacons;
