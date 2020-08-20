import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteTask(action) {
  try {
    yield axios.delete(`/api/operis/deleteTask/${action.payload.taskID}`);
    yield put({
      type: 'GET_PROJECT_TASKS',
      payload: {
        projectID: action.payload.projectID,
        orderBy: 'id',
      },
    });
  } catch (err) {
    console.log('Error deleting task. ', err);
  }
}

function* deleteTaskSaga() {
  yield takeLatest('DELETE_TASK', deleteTask);
}

export default deleteTaskSaga;
