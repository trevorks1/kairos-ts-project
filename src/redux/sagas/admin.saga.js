import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//gets list of admin
function* getRequestedOrg() {
  try {
    const requestedList = yield axios.get('/api/admin/requested');
    yield put({
      type: 'SET_REQUESTED_ADMIN',
      payload: requestedList.data,
    });
    console.log('ADMIN SAGA', requestedList.data);
  } catch (err) {
    console.log('Could not get requested list!', err);
  }
}

function* getApprovedOrg() {
  try {
    const requestedList = yield axios.get('/api/admin/approved');
    yield put({
      type: 'SET_APPROVED_ADMIN',
      payload: requestedList.data,
    });
    console.log('ADMIN SAGA', requestedList.data);
  } catch (err) {
    console.log('Could not get requested list!', err);
  }
}

function* deleteOrg(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.delete(`/api/admin/delete/${action.payload}`);
    yield put({
      type: 'GET_REQUESTED_ADMIN',
    });
  } catch (err) {
    console.log(err);
  }
}

function* approveOrg(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.put(`/api/admin/approve/${action.payload}`);
    yield put({
      type: 'GET_REQUESTED_ADMIN',
    });
  } catch (err) {
    console.log(err);
  }
}

function* adminSaga() {
  yield takeLatest('GET_REQUESTED_ADMIN', getRequestedOrg);
  yield takeLatest('GET_APPROVED_ADMIN', getApprovedOrg);
  yield takeLatest('DELETE_ORG', deleteOrg);
  yield takeLatest('APPROVE_ORG', approveOrg);
}

export default adminSaga;
