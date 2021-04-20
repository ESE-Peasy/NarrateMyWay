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

let devices: Device[] = [];
let alertPresented: boolean = false;

async function bluetoothDisabledAlert(manager: BleManager) {
  if (alertPresented) {
    return manager;
  }
  alertPresented = true;
  Speech.speak(
    'Bluetooth disabled. Bluetooth must be enabled for this app to work'
  );
  Alert.alert(
    'Bluetooth is disabled',
    'Bluetooth must be enabled for this application to work',
    [
      {
        text: Platform.OS === 'android' ? 'Enable' : 'OK',
        onPress: async () => {
          if (Platform.OS === 'android') {
            // On Android we can enable Bluetooth
            try {
              const newManager = await manager.enable('test');
              setListener(newManager);
              alertPresented = false;
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
      devices = [];
      manager.stopDeviceScan();
      bluetoothDisabledAlert(manager).then((newManager) => {
        manager = newManager;
        startScan(manager);
      });
    } else if (state === 'PoweredOn') {
      devices = [];
      startScan(manager);
    }
  });
}

function startScan(manager: BleManager) {
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      manager.stopDeviceScan();
      console.log(error.reason);
    }
    if (device && device.name && device.rssi) {
      if (device.name.toUpperCase().startsWith('NMW:')) {
        if (device.rssi > THRESHOLD) {
          devices.push(device);
        }
      }
    }
  });
}

const scanForBeacons = (manager: BleManager) => {
  const dispatch = useDispatch();

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

  manager.state().then((state) => {
    if (state === 'PoweredOff') {
      bluetoothDisabledAlert(manager).then((newManager) => {
        manager = newManager;
        setListener(manager);
        startScan(manager);
      });
    } else if (state === 'PoweredOn') {
      setListener(manager);
      startScan(manager);
    }
  });
};
export default scanForBeacons;
