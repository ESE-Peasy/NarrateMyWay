import { BeaconDetectedAction, BeaconState, BeaconStateAction } from '../types';
import { BEACON_STATE_ACTION_TYPES } from './actions';

export const initialState: BeaconState = [];

function beaconStateReducer(
  state: BeaconState = initialState,
  action: BeaconStateAction
) {
  //   const newState: BeaconState = state;
  console.log(state);
  switch (action.type) {
    case BEACON_STATE_ACTION_TYPES.BEACON_DETECTED: {
      const { beacon } = action as BeaconDetectedAction;
      return state.concat(beacon);
    }
    case BEACON_STATE_ACTION_TYPES.BEACON_OUT_OF_RANGE: {
      return state;
    }
    default:
      return state;
  }
}

export default beaconStateReducer;
