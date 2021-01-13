import { combineReducers } from 'redux';

const postingsForSelectedCause = (state = [], action) => {
  switch (action.type) {
    case 'SET_POSTINGS_SELECTED_CAUSE':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  postingsForSelectedCause,
});
