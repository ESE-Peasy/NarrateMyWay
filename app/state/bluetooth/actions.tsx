import { BeaconDetectedAction } from '../types';

export enum BEACON_STATE_ACTION_TYPES {
  BEACON_DETECTED = 'BEACON_STATE/BEACON_DETECTED',
  BEACON_OUT_OF_RANGE = 'BEACON_STATE/BEACON_OUT_OF_RANGE'
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
