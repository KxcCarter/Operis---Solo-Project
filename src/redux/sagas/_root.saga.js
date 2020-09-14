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
import addTalentToRole from './addTalentToRole.saga';
import updateProjectDetails from './updateProjectDetails.saga';
import updateTaskStatus from './updateTaskStatus.saga';
import getProjectsOrdered from './getProjectsOrdered.saga';
import newTalent from './newTalent.saga';
import updateTalentDetails from './updateTalentDetails.saga';
import deleteProjectSaga from './deleteProject.saga';
import deleteTaskSaga from './deleteTask.saga';
import deleteCrewRoleSaga from './deleteProjectCrewRole.saga';
import updateProjectStatus from './updateProjectStatus.saga';
import deleteS3ImageSaga from './deleteS3Image.saga';

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
    getProjectsOrdered(),
    projectDetails(),
    newProject(),
    newTask(),
    newTalent(),
    updateNote(),
    updateTask(),
    updateTaskStatus(),
    updateProjectDetails(),
    updateProjectStatus(),
    updateTalentDetails(),
    cardTasksSaga(),
    crewList(),
    userTalentPool(),
    rolesSaga(),
    addRoleToProject(),
    imageInfoSaga(),
    addTalentToRole(),
    deleteProjectSaga(),
    deleteTaskSaga(),
    deleteCrewRoleSaga(),
    deleteS3ImageSaga(),
  ]);
}
