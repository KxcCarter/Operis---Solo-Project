import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getProjectDetails(action) {
  try {
    const response = yield axios.get(`/api/operis/${action.payload}`);
    yield put({
      type: 'SET_PROJECT_DETAILS',
      payload: response.data[0],
    });
  } catch (err) {
    console.log('ERROR getting project detail data: ', err);
  }
}

function* projectDetails() {
  yield takeLatest('GET_PROJECT_DETAILS', getProjectDetails);
}

export default projectDetails;
