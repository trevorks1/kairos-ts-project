import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets list of activities
function* getAllActivities() {
  try {
    const activityList = yield axios.get('/api/activities/all');
    yield put({
      type: 'SET_ACTIVITIES',
      payload: activityList.data,
    });
  } catch (err) {
    console.log('Could not get activities list!', err);
  }
}

// gets list of user preferred activities
function* getPrefActivities() {
  try {
    const prefActivityList = yield axios.get(
      '/api/activities/get-preferred-activities'
    );
    yield put({
      type: 'SET_PREF_ACTIVITIES',
      payload: prefActivityList.data,
    });
  } catch (err) {
    console.log('Could not get preferred activities list!', err);
  }
}

// gets retrieve all postings filtered by logged in user's preferred activities
function* getPrefActivityPostings() {
  try {
    const prefActivityPostingsList = yield axios.get(
      '/api/activities/postings-for-volunteer'
    );
    yield put({
      type: 'SET_PREF_ACTIVITY_POSTINGS',
      payload: prefActivityPostingsList.data,
    });
  } catch (err) {
    console.log('Could not get preferred activity postings list!', err);
  }
}

// DELETE saved preferred activity for a logged in volunteer user
function* deletePrefActivities(action) {
  try {
    yield axios.delete('/api/activities/delete', {
      data: action.payload,
    });
  } catch (err) {
    console.log('Could not delete activity!', err);
  }
}

// POST a preferred activity for a logged in volunteer user
function* savePrefActivity(action) {
  try {
    yield axios.post(`/api/activities/save`, action.payload);
  } catch (err) {
    console.log(err);
  }
}

// deletes first, then posts preferred activity for a logged in volunteer user
// updates reducer and re-loads page with new info
function* updatePrefActivity(action) {
  try {
    yield axios.delete('/api/activities/delete', {
      data: {
        activity_type_id: action.payload.deleteArray,
      },
    });

    yield axios.post(`/api/activities/save`, {
      activity_type_id: action.payload.postArray,
    });
    // calling getPrefActivities to update Reducer and force page to re-render
    yield put({
      type: 'GET_PREF_ACTIVITIES',
    });
  } catch (err) {
    console.log('something went wrong updating the preferred activities!', err);
  }
}

function* activitiesSaga() {
  yield takeLatest('GET_ACTIVITIES', getAllActivities);
  yield takeLatest('GET_PREF_ACTIVITIES', getPrefActivities);
  yield takeLatest('GET_PREF_ACTIVITY_POSTINGS', getPrefActivityPostings);
  yield takeLatest('DELETE_PREF_ACTIVITY', deletePrefActivities);
  yield takeLatest('POST_ACTIVITIES', savePrefActivity);
  yield takeLatest('UPDATE_PREF_ACTIVITIES', updatePrefActivity);
}

export default activitiesSaga;
