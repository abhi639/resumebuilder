import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'edit-Project',
  initialState: {
    editProjects: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (project) => {
      project.loading = true
      project.message = ''
    },
    success: (project, action) => {
      project.loading = false
      project.message = ''
      project.editProjects = action.payload
    },
    failed: (project, action) => {
      project.loading = false
      project.message = action.payload.message
    },
    reset: (project, action) => {
      project.loading = false
      project.message = ''
    },
  },
})

const {requested, success, failed, reset} = slice.actions
export default slice.reducer

export const EditorUpdateEmployeeProject = (data, projectId) => {
  // console.log('UpdateProject.....', data)
  return apiCallBegan({
    url: `employeeProject/updateEmployeeProjectadd/proje/${projectId}`,
    method: 'PUT',
    data,
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
}
