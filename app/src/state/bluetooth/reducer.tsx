import {
  BeaconDetectedAction,
  CurrentBeacon,
  BeaconStateAction
} from '../types';
import { BEACON_STATE_ACTION_TYPES } from './actions';

export const currentBeacon: CurrentBeacon = {};

const now = new Date();
let lastTime = Math.round(now.getTime() / 1000); // milliseconds to seconds

function beaconStateReducer(
  state: CurrentBeacon = currentBeacon,
  action: BeaconStateAction
) {
  switch (action.type) {
    case BEACON_STATE_ACTION_TYPES.BEACON_DETECTED: {
      if (lastTime <= Math.round(now.getTime() / 1000)) {
        lastTime = Math.round(now.getTime() / 1000);
        const { beacon } = action as BeaconDetectedAction;
        return beacon;
      } else {
        return state;
      }
    }
    case BEACON_STATE_ACTION_TYPES.BEACON_OUT_OF_RANGE: {
      console.log('The beacon is out of range');
      return {};
    }
    default:
      return state;
  }
}

export default beaconStateReducer;
