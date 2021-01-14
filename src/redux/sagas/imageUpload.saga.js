import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postImageUrl(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const data = {
      imageUrl: action.payload,
    };

    const response = yield axios.post('/api/imageurl', data, config);
  } catch (error) {
    console.log('Image failed to upload: ', error);
  }
}

function* postImageUrlSaga() {
  yield takeLatest('POST_IMAGE_URL', postImageUrl);
}

export default postImageUrlSaga;
