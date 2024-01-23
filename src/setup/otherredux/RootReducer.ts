import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth'
import roleReducer from '../otherredux/reducer'
import getRoles from '../../Store/App/Admin/getRoles.js'
import authReducer from '../../Store/Auth/Login.js'
import getTechnologies from '../../Store/App/Admin/getTechnologies.js'
import getActivity from '../../Store/App/Admin/getActivity'
import addTechnology from '../../Store/App/Admin/addTechnology'
import getProjects from '../../Store/App/Manager/getProjects'
import updateProject from '../../Store/App/Manager/updateProject'
import getEducation from '../../Store/App/Manager/getEducation'
import getAsignedProject from '../../Store/App/Manager/getAsignedProject'
import EditorUpdateEmployeeProject from '../../Store/App/Manager/EditorUpdateEmployeeProject'
import deleteEmployeeProject from '../../Store/App/Manager/deleteEmployeeProject'
import editeducationdetails from '../../Store/App/Manager/editEducation'
import addProfileImage from '../../Store/App/Manager/addProfileImage'
import addProjectMaster from '../../Store/App/Manager/addProjectMaster'
import getProjectMaster from '../../Store/App/Manager/getProjectMaster'
import deleteProjectMaster from '../../Store/App/Manager/deleteProjectMaster'
import getProjectMasterById from '../../Store/App/Manager/getProjectMasterById'
import {downloadFile} from '../../Store/App/Common/downloadTemplate'
import resetForgetPassword from '../../Store/App/Common/resetForgetPassword'

interface AuthState {
  accessToken: any
  loading: boolean
  message: string
  user: null
}

export const rootReducer = combineReducers({
  auth: authReducer,
  role: roleReducer,
  newRoles: getRoles,
  technology: getTechnologies,
  activity: getActivity,
  newTechnology: addTechnology, // Add the newTechnology reducer here
  projects: getProjects,
  updateProject: updateProject,
  getEducation: getEducation,
  getAsignedProject: getAsignedProject,
  EditorUpdateEmployeeProject: EditorUpdateEmployeeProject,
  deleteEmployeeProject: deleteEmployeeProject,
  editeducationdetails: editeducationdetails,
  downloadFile: downloadFile,
  addProjectMaster: addProjectMaster,
  getProjectMaster: getProjectMaster,
  deleteProjectMaster: deleteProjectMaster,
  getProjectMasterById: getProjectMasterById,
  addProfileImage: addProfileImage,
  resetForgetPassword: resetForgetPassword,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
