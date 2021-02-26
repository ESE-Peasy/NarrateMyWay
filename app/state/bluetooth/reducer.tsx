import {
  BeaconDetectedAction,
  CurrentBeacon,
  BeaconStateAction
} from '../types';
import { BEACON_STATE_ACTION_TYPES } from './actions';

export const currentBeacon: CurrentBeacon = {
  beaconName: 'beaconName',
  beaconId: 'beaconId'
};

function beaconStateReducer(
  state: CurrentBeacon = currentBeacon,
  action: BeaconStateAction
) {
  switch (action.type) {
    case BEACON_STATE_ACTION_TYPES.BEACON_DETECTED: {
      const { beacon } = action as BeaconDetectedAction;
      return beacon;
    }
    case BEACON_STATE_ACTION_TYPES.BEACON_OUT_OF_RANGE: {
      return { beaconName: 'null', beaconId: 'test' };
    }
    default:
      return state;
  }
}

export default beaconStateReducer;
