import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendUpdateNote(action) {
  try {
    console.log(action.payload);
    yield axios.put(`api/operis/update/${action.payload.id}`, action.payload);
    const response = yield axios.get('/api/operis');
    yield put({
      type: 'SET_PROJECTS',
      payload: response.data,
    });
  } catch (err) {
    console.log('PUT error in updateNote saga: ', err);
  }
}

function* updateNote() {
  yield takeLatest('UPDATE_NOTE', sendUpdateNote);
}

export default updateNote;
