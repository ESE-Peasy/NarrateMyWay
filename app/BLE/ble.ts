import { BleManager, Device } from 'react-native-ble-plx';
import {
  beaconDetected,
  beaconOutOfRange
} from '../src/state/bluetooth/actions';

import { useDispatch } from 'react-redux';

const THRESHOLD = -70;
const TIMEOUT = 2000; // in ms

const scanForBeacons = (manager: BleManager) => {
  const dispatch = useDispatch();
  let devices: Device[] = [];

  // clear devices list
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
              dispatch(beaconDetected(closest.name, closest.id));
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

    if (device && device.name && device.rssi) {
      if (device.name.startsWith('nmw')) {
        if (device.rssi > -THRESHOLD) {
          devices.push(device);
        }
      }
    }
  });
};
export default scanForBeacons;
