import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getFilteredPostings(action) {
  try {
    const activity_id = action.payload.activity_id;
    const age_id = action.payload.age_id;
    const cause_id = action.payload.age_id;
    console.log('Activity ID: ', activity_id);
    console.log('Age ID: ', age_id);
    console.log('Cause ID: ', cause_id);
    // const filteredPostings = axios.get()
  } catch (err) {
    console.log('could not get filtered postings', err);
  }
}

function* filterPostingsSaga() {
  yield takeLatest('SUBMIT_FILTERS', getFilteredPostings);
}

export default filterPostingsSaga;
