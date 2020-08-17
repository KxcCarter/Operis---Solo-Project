import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendUpdateDetails(action) {
  try {
    console.log(action.payload);

    yield axios.put(
      `api/operis/updateProjectDetails/${action.payload.id}`,
      action.payload
    );
    yield put({ type: 'GET_PROJECT_DETAILS', payload: action.payload.id });
  } catch (err) {
    console.log('PUT error in UpdateProjectDetails saga: ', err);
  }
}

function* updateProjectDetails() {
  yield takeLatest('UPDATE_PROJECT_DETAILS', sendUpdateDetails);
}

export default updateProjectDetails;
