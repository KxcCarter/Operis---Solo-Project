import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendUpdateTask(action) {
  try {
    console.log(action.payload);

    yield axios.put(
      `api/operis/updateTask/${action.payload.taskID}`,
      action.payload
    );
    yield put({
      type: 'GET_PROJECT_TASKS',
      payload: {
        projectID: action.payload.projectID,
        orderBy: 'id',
      },
    });
  } catch (err) {
    console.log('PUT error in updateTask saga: ', err);
  }
}

function* updateTask() {
  yield takeLatest('UPDATE_TASK', sendUpdateTask);
}

export default updateTask;
