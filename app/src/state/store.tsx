import { createStore } from 'redux';
import beaconStateReducer from './bluetooth/reducer';

const store = createStore(beaconStateReducer);
export default store;
