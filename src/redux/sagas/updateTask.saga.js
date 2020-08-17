import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendUpdateTask(action) {
  try {
    console.log(action.payload);

    yield axios.put(
      `api/operis/updateTask/${action.payload.taskID}`,
      action.payload
    );
    yield put({ type: 'GET_PROJECT_TASKS', payload: action.payload.taskID });
  } catch (err) {
    console.log('PUT error in updateTask saga: ', err);
  }
}

function* updateTask() {
  yield takeLatest('UPDATE_TASK', sendUpdateTask);
}

export default updateTask;
