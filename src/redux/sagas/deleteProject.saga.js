import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteProject(action) {
  try {
    console.log(action.payload);

    yield axios.delete(
      `api/operis/deleteProject/${action.payload}`,
      action.payload
    );
  } catch (err) {
    console.log('DELETE error in deleteProject saga: ', err);
  }
}

function* deleteProjectSaga() {
  yield takeLatest('DELETE_PROJECT', deleteProject);
}

export default deleteProjectSaga;
