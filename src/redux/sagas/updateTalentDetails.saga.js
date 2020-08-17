import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendTalentDetails(action) {
  try {
    yield axios.put(`api/operis/updateTalentDetails/`, action.payload);
    yield put({ type: 'GET_USER_TALENT' });
  } catch (err) {
    console.log('PUT error in UpdateTalentDetails saga: ', err);
  }
}

function* updateTalentDetails() {
  yield takeLatest('UPDATE_TALENT_DETAILS', sendTalentDetails);
}

export default updateTalentDetails;
