import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets list of age-ranges
function* getAgesList() {
  try {
    const agesList = yield axios.get('/api/ages/all');
    yield put({
      type: 'SET_AGES',
      payload: agesList.data,
    });
  } catch (err) {
    console.log('Could not get age-range list!', err);
  }
}

function* agesSaga() {
  yield takeLatest('GET_AGES', getAgesList);
}

export default agesSaga;
