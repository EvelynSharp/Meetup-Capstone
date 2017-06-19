import { combineReducers } from 'redux';
import user from './user';
import events from './events';
import userError from './userError';
import viewuser from './viewuser';

const rootReducer = combineReducers({
  user,
  events,
  userError,
  viewuser,
});

export default rootReducer;
