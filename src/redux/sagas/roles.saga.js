import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getRoles(action) {
  try {
    const response = yield axios.get(`api/operis/roles`);
    yield put({ type: 'SET_ROLES', payload: response.data });
  } catch (err) {
    console.log('Error in GETTING roles: ', err);
  }
}

function* rolesSaga() {
  yield takeLatest('GET_ROLES', getRoles);
}

export default rolesSaga;
