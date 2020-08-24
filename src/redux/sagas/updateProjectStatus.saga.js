import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendUpdateStatus(action) {
  try {
    // Currently this only can mark projects complete, not incomplete.

    yield axios.put(
      `api/operis/completionStatus/${action.payload.projectID}`,
      action.payload
    );
    yield put({
      type: 'GET_PROJECT_DETAILS',
      payload: action.payload.projectID,
    });
  } catch (err) {
    console.log('PUT error in UpdateProjectStatus saga: ', err);
  }
}

function* updateProjectStatus() {
  yield takeLatest('MARK_PROJECT_COMPLETE', sendUpdateStatus);
}

export default updateProjectStatus;
