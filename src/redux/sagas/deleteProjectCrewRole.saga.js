import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteCrewRole(action) {
  try {
    yield axios.delete(
      `/api/operis/deleteProjectCrewRole/${action.payload.crewRoleID}`
    );
    yield put({
      type: 'GET_CREW_LIST',
      payload: action.payload.projectID,
    });
  } catch (err) {
    console.log('Error deleting crew role. ', err);
  }
}

function* deleteCrewRoleSaga() {
  yield takeLatest('DELETE_CREW_ROLE', deleteCrewRole);
}

export default deleteCrewRoleSaga;
