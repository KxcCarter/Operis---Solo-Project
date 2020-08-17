import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* setTalentRole(action) {
  try {
    console.log(action.payload);
    yield axios.put(
      `/api/operis/setTalentRole/${action.payload.id}`,
      action.payload
    );
    yield put({
      type: 'GET_CREW_LIST',
      payload: action.payload.pID,
    });
  } catch (error) {
    console.log('Error with adding talent to role:', error);
  }
}

function* addTalentToRole() {
  yield takeLatest('ADD_TALENT_TO_ROLE', setTalentRole);
}

export default addTalentToRole;
