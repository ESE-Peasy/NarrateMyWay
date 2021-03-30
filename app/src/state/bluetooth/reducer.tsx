import {
  BeaconDetectedAction,
  CurrentBeacon,
  BeaconStateAction,
  ExpansionPackDetectedAction
} from '../types';
import { BEACON_STATE_ACTION_TYPES } from './actions';

export const currentBeacon: CurrentBeacon = {};
const BEACON_DELAY_TIME = 30000; // in ms
const EXPANSION_PACK_DELAY_TIME = 10000; // in ms
let lastTime = Date.now() - BEACON_DELAY_TIME;

function beaconStateReducer(
  state: CurrentBeacon = currentBeacon,
  action: BeaconStateAction
) {
  const currentTime = Date.now();
  switch (action.type) {
    case BEACON_STATE_ACTION_TYPES.BEACON_DETECTED: {
      if (lastTime + BEACON_DELAY_TIME <= currentTime) {
        lastTime = currentTime;
        const { beacon } = action as BeaconDetectedAction;
        return beacon;
      } else {
        return state;
      }
    }
    case BEACON_STATE_ACTION_TYPES.BEACON_OUT_OF_RANGE: {
      if (lastTime + BEACON_DELAY_TIME <= currentTime) {
        return {};
      } else {
        return state;
      }
    }
    case BEACON_STATE_ACTION_TYPES.EXPANSION_PACK_DETECTED: {
      if (lastTime + EXPANSION_PACK_DELAY_TIME <= currentTime) {
        lastTime = currentTime;
        const { beacon } = action as ExpansionPackDetectedAction;
        return beacon;
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}

export default beaconStateReducer;
