import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import cardSaga from './getProjectCard.saga';
import projectDetails from './projectDetails.saga';
import newProject from './newProject.saga';
import updateNote from './updateNote.saga';
import updateTask from './updateTask.saga';
import newTask from './newTask.saga';
import cardTasksSaga from './getTasks.saga';
import crewList from './crewList.saga';
import userTalentPool from './userTalentPool.saga';
import rolesSaga from './roles.saga';
import addRoleToProject from './addRoleToProject.saga';
import imageInfoSaga from './imageInfoSaga.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    cardSaga(),
    projectDetails(),
    newProject(),
    newTask(),
    updateNote(),
    updateTask(),
    cardTasksSaga(),
    crewList(),
    userTalentPool(),
    rolesSaga(),
    addRoleToProject(),
    imageInfoSaga(),
  ]);
}
