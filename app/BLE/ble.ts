import { BleManager, Device } from 'react-native-ble-plx';
import {
  beaconDetected,
  beaconOutOfRange
} from '../src/state/bluetooth/actions';

import { useDispatch } from 'react-redux';

const THRESHOLD = -70;

const scanForBeacons = (manager: BleManager) => {
  const dispatch = useDispatch();
  const devices: Device[] = [];

  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      // manager.stopDeviceScan();
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
  if (devices.length > 0) {
    let closestDevice = devices[0];
    for (const dev of devices) {
      if (dev && dev.rssi && closestDevice.rssi) {
        if (dev.rssi > closestDevice.rssi) {
          closestDevice = dev;
        }
      }
    }

    dispatch(beaconOutOfRange());
    if (closestDevice.name)
      dispatch(beaconDetected(closestDevice.name, closestDevice.id));
  }
};

export default scanForBeacons;
