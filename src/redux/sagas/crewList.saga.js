import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getCrewList(action) {
  try {
    console.log(action.payload);
    const response = yield axios.get(
      `api/operis/crewProject/${action.payload}`
    );
    yield put({ type: 'SET_PROJECT_CREW_LIST', payload: response.data });
  } catch (err) {
    console.log('GET error in crewList saga: ', err);
  }
}

function* crewList() {
  yield takeLatest('GET_CREW_LIST', getCrewList);
}

export default crewList;
