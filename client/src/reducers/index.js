import { combineReducers } from 'redux';
import user from './user';
import events from './events';
import userError from './userError';

const rootReducer = combineReducers({
  user,
  events,
  userError,
});

export default rootReducer;
