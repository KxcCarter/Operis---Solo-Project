import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getProjectCard() {
  try {
    const response = yield axios.get('/api/operis');
    yield put({
      type: 'SET_PROJECTS',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR getting project data: ', err);
  }
}

function* cardSaga() {
  yield takeLatest('GET_PROJECTS', getProjectCard);
}

export default cardSaga;
