import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import causesSaga from './causes.saga';
import activitiesSaga from './activities.saga';
import agesSaga from './ages.saga';
import postingsSaga from './postings.saga';
import imageUploadSaga from './imageUpload.saga';
import adminSaga from './admin.saga';
import orgProfileSaga from './orgProfile.saga';
import wantToHelpSaga from './wantToHelp.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    causesSaga(),
    activitiesSaga(),
    agesSaga(),
    postingsSaga(),
    imageUploadSaga(),
    adminSaga(),
    orgProfileSaga(),
    wantToHelpSaga(),
  ]);
}
