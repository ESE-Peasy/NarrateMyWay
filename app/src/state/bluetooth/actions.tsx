import { BeaconDetectedAction } from '../types';

export enum BEACON_STATE_ACTION_TYPES {
  BEACON_DETECTED = 'BEACON_STATE/BEACON_DETECTED', // eslint-disable-line no-unused-vars
  BEACON_OUT_OF_RANGE = 'BEACON_STATE/BEACON_OUT_OF_RANGE' // eslint-disable-line no-unused-vars
}

export const beaconDetected = (
  beaconName: string,
  beaconId: string
): BeaconDetectedAction => ({
  type: BEACON_STATE_ACTION_TYPES.BEACON_DETECTED,
  beacon: {
    beaconName,
    beaconId
  }
});

export const beaconOutOfRange = () => ({
  type: BEACON_STATE_ACTION_TYPES.BEACON_OUT_OF_RANGE
});
