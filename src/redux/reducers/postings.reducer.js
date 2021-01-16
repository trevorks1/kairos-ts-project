import { combineReducers } from 'redux';

const postingsForBrowsePage = (state = [], action) => {
  switch (action.type) {
    case 'SET_POSTINGS_SELECTED_CAUSE':
      return action.payload;
    case 'SET_FILTERED_POSTINGS':
      return action.payload;
    default:
      return state;
  }
};

const postingsForVolunteerUser = (state = [], action) => {
  switch (action.type) {
    case 'SET_POSTINGS_FOR_VOLUNTEER':
      return action.payload;
    default:
      return state;
  }
};

const postingDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_POSTING_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  postingsForBrowsePage,
  postingsForVolunteerUser,
  postingDetails,
});
