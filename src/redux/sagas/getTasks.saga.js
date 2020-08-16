import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTasks(action) {
  try {
    const response = yield axios.get(`/api/operis/tasks`, {
      params: { id: action.payload.id, orderBy: action.payload.orderBy },
    });
    yield put({
      type: 'SET_PROJECT_TASKS',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR getting project data: ', err);
  }
}

function* cardTasksSaga() {
  yield takeLatest('GET_PROJECT_TASKS', getTasks);
}

export default cardTasksSaga;
