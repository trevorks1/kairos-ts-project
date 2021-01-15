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

function* orgProfileSaga() {
  yield takeLatest('GET_ORG_PROFILE', getOrgProfile);
}

export default orgProfileSaga;
