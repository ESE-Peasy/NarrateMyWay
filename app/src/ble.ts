import { BleManager, Device } from 'react-native-ble-plx';
import {
  beaconDetected,
  beaconOutOfRange,
  expansionPackDetected
} from '../src/state/bluetooth/actions';
import { useDispatch } from 'react-redux';
import { Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission
} from 'react-native-permissions';

const THRESHOLD = -100; // in dB
const TIMEOUT = 2000; // in ms

const EXPANSION_PACK = 'NMW:1-EXP-AND';

const checkPermission = (permission: Permission) => {
  check(permission).then((result) => {
    switch (result) {
      case RESULTS.DENIED || RESULTS.BLOCKED:
        console.log('Permission denied');
        console.log(permission);
        request(permission);
        break;
    }
  });
};

const checkAllPermissions = () => {
  if (Platform.OS == 'android') {
    console.log('android');
    checkPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    checkPermission(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    checkPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    checkPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
  } else if (Platform.OS == 'ios') {
    console.log('ios');
    checkPermission(PERMISSIONS.IOS.LOCATION_ALWAYS);
    checkPermission(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
  }
};

const scanForBeacons = (manager: BleManager) => {
  checkAllPermissions();
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

  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      manager.stopDeviceScan();
      console.log(error.reason);
    }
    if (device && device.name) {
      if (device.name.toUpperCase().startsWith('NMW:')) {
        // if (device.rssi > THRESHOLD) {
        console.log(device.name);
        devices.push(device);
        // }
      }
    }
  });
};
export default scanForBeacons;
