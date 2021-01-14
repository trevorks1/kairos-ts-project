import { combineReducers } from 'redux';

const postingsForBrowsePage = (state = [], action) => {
  switch (action.type) {
    case 'SET_POSTINGS_SELECTED_CAUSE':
      return action.payload;
    default:
      return state;
  }
};

const filteredPostingsForBrowsePage = (state = [], action) => {
  switch (action.type) {
    case 'SET_FILTERED_POSTINGS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  postingsForBrowsePage,
  filteredPostingsForBrowsePage,
});
