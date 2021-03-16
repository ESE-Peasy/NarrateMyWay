import { BleManager, Device } from 'react-native-ble-plx';
import {
  beaconDetected,
  beaconOutOfRange
} from '../src/state/bluetooth/actions';
import { useDispatch } from 'react-redux';

const THRESHOLD = -70; // in dB
const TIMEOUT = 2000; // in ms

const EXPANSION_PACK = 'NMW:1-EXP-AND';

async function downloadExpansion(device: Device) {
  console.log('Expand beacon found');
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
              if (closest.name.toUpperCase() == EXPANSION_PACK) {
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
      if (device.name.toUpperCase().startsWith('NMW:')) {
        if (device.rssi > THRESHOLD) {
          devices.push(device);
        }
      }
    }
  });
};
export default scanForBeacons;
