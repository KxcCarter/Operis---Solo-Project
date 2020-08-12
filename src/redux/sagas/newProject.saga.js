import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createNewProject(action) {
  try {
    // passes the data
    yield axios.post('/api/operis', action.payload);
    yield put('GET_PROJECTS');
  } catch (error) {
    console.log('Error with creating new project:', error);
  }
}

function* newProject() {
  yield takeLatest('REGISTER', createNewProject);
}

export default newProject;
