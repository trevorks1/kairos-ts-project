import { put, takeLatest } from 'redux-saga/effects';

function* setBackBtnHistory(action) {
  try {
    yield put({
      type: 'SET_BACK_HISTORY_REDUCER',
      payload: action.payload,
    });
  } catch (err) {
    console.log('could not set back btn history!', err);
  }
}

function* backBtnHistorySaga() {
  yield takeLatest('SET_BACK_HISTORY_SAGA', setBackBtnHistory);
}

export default backBtnHistorySaga;
