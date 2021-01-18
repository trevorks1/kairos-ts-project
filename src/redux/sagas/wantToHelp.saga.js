import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* wantToHelpSingle() {
  try {
  } catch (err) {
    console.log('could not register volunteer to this event', err);
  }
}

function* wantToHelpSaga() {
  yield takeLatest('WANT_TO_HELP_SINGLE', wantToHelpSingle);
}

export default wantToHelpSaga;
