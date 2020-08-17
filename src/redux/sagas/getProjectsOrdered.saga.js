import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getProjectCardsOrdered(action) {
  try {
    console.log('Order by saga payload: ', action.payload);
    const response = yield axios.get('/api/operis/ordered', {
      params: { orderBy: action.payload },
    });
    yield put({
      type: 'SET_PROJECTS',
      payload: response.data,
    });
  } catch (err) {
    console.log('Error GETTING ordered project data: ', err);
  }
}

function* getProjectsOrdered() {
  yield takeLatest('GET_PROJECTS_ORDERED', getProjectCardsOrdered);
}

export default getProjectsOrdered;
