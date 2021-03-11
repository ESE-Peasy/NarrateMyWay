import { combineReducers, createStore } from 'redux';
import beaconStateReducer from './bluetooth/reducer';
import themeReducer from './themes/reducer';

const rootReducer = combineReducers({
  beaconStateReducer,
  themeReducer
});
const store = createStore(rootReducer);
export default store;
