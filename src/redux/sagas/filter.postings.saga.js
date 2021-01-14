import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getFilteredPostings(action) {
  try {
    const activity_id = action.payload.activity_id;
    const age_id = action.payload.age_id;
    const cause_id = action.payload.age_id;
    const filteredPostings = yield axios.get(
      `/api/postings/browse/${activity_id}/${age_id}/${cause_id}`
    );
    yield put({
      type: 'SET_FILTERED_POSTINGS',
      payload: filteredPostings.data,
    });
  } catch (err) {
    console.log('could not get filtered postings', err);
  }
}

function* filterPostingsSaga() {
  yield takeLatest('SUBMIT_FILTERS', getFilteredPostings);
}

export default filterPostingsSaga;
