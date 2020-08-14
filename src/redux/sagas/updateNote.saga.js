import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendUpdateNote(action) {
  try {
    console.log(action.payload);
    // Calls to the appropriate server route sending id and ntoe data.
    yield axios.put(
      `api/operis/updateNote/${action.payload.id}`,
      action.payload
    );
    // Calls to server to get new data for all projects.
    // const response = yield axios.get('/api/operis');
    // yield put({
    //   type: 'SET_PROJECTS',
    //   payload: response.data,
    // });
    yield put({ type: 'GET_PROJECT_DETAILS', payload: action.payload.id });
  } catch (err) {
    console.log('PUT error in updateNote saga: ', err);
  }
}

function* updateNote() {
  yield takeLatest('UPDATE_NOTE', sendUpdateNote);
}

export default updateNote;
