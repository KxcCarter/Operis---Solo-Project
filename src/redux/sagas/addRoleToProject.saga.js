import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addProjectRole(action) {
  try {
    console.log(action.payload);
    yield axios.post(
      `/api/operis/addProjectRole/${action.payload.id}`,
      action.payload
    );
    yield put({
      type: 'GET_CREW_LIST',
      payload: action.payload.id,
    });
  } catch (error) {
    console.log('Error with adding role to project:', error);
  }
}

function* addRoleToProject() {
  yield takeLatest('ADD_PROJECT_ROLE', addProjectRole);
}

export default addRoleToProject;
