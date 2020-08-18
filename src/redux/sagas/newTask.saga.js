import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createNewTask(action) {
  try {
    console.log('Data for new task creation: ', action.payload);
    yield axios.post('/api/operis/newTask', action.payload);
    yield put({
      type: 'GET_PROJECT_TASKS',
      payload: {
        projectID: action.payload.projectID,
        orderBy: 'id',
      },
    });
  } catch (error) {
    console.log('Error with creating new task:', error);
  }
}

function* newTask() {
  yield takeLatest('CREATE_NEW_TASK', createNewTask);
}

export default newTask;
