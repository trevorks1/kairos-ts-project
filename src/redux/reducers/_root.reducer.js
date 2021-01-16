import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import causes from './causes.reducer';
import activities from './activities.reducer';
import postings from './postings.reducer';
import ages from './ages.reducer';
import backHistoryReducer from './back.history.reducer';
import adminReducer from './admin.reducer';
import adminApprovedReducer from './adminApproved.reducer';
import orgSuccess from './registration.reducer';
import orgProfileReducer from './orgProfile.reducer';
import imageReducer from './image.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  causes,
  activities,
  postings,
  ages,
  backHistoryReducer,
  adminReducer,
  adminApprovedReducer,
  orgSuccess,
  orgProfileReducer,
  imageReducer,
});

export default rootReducer;
