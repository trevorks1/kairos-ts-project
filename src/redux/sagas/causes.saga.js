import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets list of causes
function* getCausesList() {
  try {
    const causesList = yield axios.get('/api/causes/all');
    yield put({
      type: 'SET_CAUSES',
      payload: causesList.data,
    });
  } catch (err) {
    console.log('Could not get causes list!', err);
  }
}

function* getActivitiesSelectedCause(action) {
  try {
    const activities = yield axios.get(`/api/causes/select/${action.payload}`);
    yield put({
      type: 'SET_POSTINGS_SELECTED_CAUSE',
      payload: activities.data,
    });
  } catch (err) {
    console.log('could not get activities for the selected cause!', err);
  }
}

function* causesSaga() {
  yield takeLatest('GET_CAUSES', getCausesList);
  yield takeLatest(
    'GET_POSTINGS_FOR_SELECTED_CAUSE',
    getActivitiesSelectedCause
  );
}

export default causesSaga;
