import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createNewProject(action) {
  try {
    // passes the data
    console.log(action.payload);
    yield axios.post('/api/operis', action.payload);
    const response = yield axios.get('/api/operis');
    yield put({
      type: 'SET_PROJECTS',
      payload: response.data,
    });
  } catch (error) {
    console.log('Error with creating new project:', error);
  }
}

function* newProject() {
  yield takeLatest('CREATE_NEW_PROJECT', createNewProject);
}

export default newProject;
