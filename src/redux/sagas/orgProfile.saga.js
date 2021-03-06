import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//gets list of activities
function* getOrgProfile() {
  try {
    const requestedList = yield axios.get('/api/organization/profile');
    yield put({
      type: 'SET_ORG_PROFILE',
      payload: requestedList.data,
    });
    console.log('ORG SAGA: ', requestedList.data);
  } catch (err) {
    console.log('Could not get requested list!', err);
  }
}

function* completeActivity(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.put(`/api/postings/active/${action.payload}`);
    yield put({
      type: 'GET_ORG_PROFILE',
    });
  } catch (err) {
    console.log(err);
  }
}

function* newActivity(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.post('/api/postings', action.payload);
  } catch (err) {
    console.log(err);
  }
}

function* updateActivity(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    const requestedList = yield axios.put(
      `/api/postings/edit/${action.payload.id}`,
      action.payload
    );
    yield put({
      type: 'GET_ORG_PROFILE',
    });
  } catch (err) {
    console.log(err);
  }
}

function* orgProfileSaga() {
  yield takeLatest('GET_ORG_PROFILE', getOrgProfile);
  yield takeLatest('PUT_ACTIVITY_COMPLETE', completeActivity);
  yield takeLatest('POST_ACTIVITY', newActivity);
  yield takeLatest('UPDATE_ACTIVITY', updateActivity);
}

export default orgProfileSaga;
