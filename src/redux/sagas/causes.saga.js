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

function* causesSaga() {
  yield takeLatest('GET_CAUSES', getCausesList);
}

export default causesSaga;
