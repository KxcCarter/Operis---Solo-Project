import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createNewTalent(action) {
  try {
    yield axios.post('/api/operis/newTalent', action.payload);
    yield put({ type: 'GET_USER_TALENT' });
  } catch (error) {
    console.log('Error with creating new talent: ', error);
  }
}

function* newTalent() {
  yield takeLatest('CREATE_NEW_TAlENT', createNewTalent);
}

export default newTalent;
