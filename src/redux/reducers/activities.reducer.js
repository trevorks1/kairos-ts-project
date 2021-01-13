import { combineReducers } from 'redux';

// Used to store list of all activities
const activityList = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACTIVITIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store list of preferred activities
const prefActivityList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PREF_ACTIVITIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store list of all postings filtered by logged in user's preferred activities
const prefActivityPostingsList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PREF_ACTIVITY_POSTINGS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  activityList,
  prefActivityList,
  prefActivityPostingsList,
});
