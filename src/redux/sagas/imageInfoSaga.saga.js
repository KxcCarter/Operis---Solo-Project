import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postImageUrl(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.put(
      `/api/operis/uploadImage/${action.payload.id}`,
      action.payload
    );
    yield put({ type: 'GET_PROJECT_DETAILS', payload: action.payload.id });
  } catch (err) {
    console.log('ERROR Image Url post (PUT) failed: ', err);
  }
}

function* imageInfoSaga() {
  yield takeLatest('POST_IMG_URL', postImageUrl);
}

export default imageInfoSaga;
