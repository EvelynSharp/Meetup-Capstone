import { combineReducers } from 'redux';
import user from './user';
import events from './events';
import userError from './userError';
import viewuser from './viewuser';
import allusers from './allusers';

const rootReducer = combineReducers({
  user,
  events,
  userError,
  viewuser,
  allusers,
});

export default rootReducer;
