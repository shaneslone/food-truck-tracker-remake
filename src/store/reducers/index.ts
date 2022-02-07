import { combineReducers } from 'redux';
import { truckReducer as trucks } from './truck';
import { userReducer as user } from './user';

export default combineReducers({
  user,
  trucks,
});
