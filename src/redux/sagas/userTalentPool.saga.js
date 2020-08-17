import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getUserTalent(action) {
  try {
    const response = yield axios.get(`/api/operis/talentPool`);
    yield put({
      type: 'SET_USER_TALENT',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR getting User Talent Pool: ', err);
  }
}

function* userTalentPool() {
  yield takeLatest('GET_USER_TALENT', getUserTalent);
}

export default userTalentPool;
