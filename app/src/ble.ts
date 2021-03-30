import { BleManager, Device } from 'react-native-ble-plx';
import {
  beaconDetected,
  beaconOutOfRange,
  expansionPackDetected
} from '../src/state/bluetooth/actions';
import { useDispatch } from 'react-redux';

const THRESHOLD = -100; // in dB
const TIMEOUT = 2000; // in ms

const EXPANSION_PACK = 'NMW:1-EXP-AND';

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
