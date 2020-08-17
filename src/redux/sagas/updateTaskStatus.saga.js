import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendUpdateTaskStatus(action) {
  try {
    console.log(action.payload);

    yield axios.put(
      `api/operis/updateTaskStatus/${action.payload.taskID}`,
      action.payload
    );
    yield put({ type: 'GET_PROJECT_TASKS', payload: action.payload.pID });
  } catch (err) {
    console.log('PUT error in updateTask saga: ', err);
  }
}

function* updateTaskStatus() {
  yield takeLatest('UPDATE_TASK_STATUS', sendUpdateTaskStatus);
}

export default updateTaskStatus;
