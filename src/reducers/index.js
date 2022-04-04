import { combineReducers } from 'redux';
import usersReducer from '../pages/users/services/reducer';

const rootReducer = combineReducers({
  usersReducer
});


export default rootReducer;
