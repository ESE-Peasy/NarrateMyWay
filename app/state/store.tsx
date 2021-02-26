import { createStore } from 'redux';
import beaconStateReducer from './bluetooth/reducer';
import { AppState } from './types';

const store = createStore(beaconStateReducer);
export default store;
