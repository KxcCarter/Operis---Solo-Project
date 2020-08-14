import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getCrewList(action) {
  try {
    const response = yield axios.get(
      `api/operis/projectCrew/${action.payload.id}`
    );
    yield put({ type: 'SET_PROJECT_CREW_LIST', payload: response.data });
  } catch (err) {
    console.log('PUT error in updateTask saga: ', err);
  }
}

function* crewList() {
  yield takeLatest('GET_CREW_LIST', getCrewList);
}

export default crewList;
