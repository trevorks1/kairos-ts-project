import { combineReducers } from 'redux';

const fakeReducer = (state = '', action) => {
  return state;
};

export default combineReducers({
  fakeReducer,
});
