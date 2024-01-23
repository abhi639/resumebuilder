import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'update-Project',
  initialState: {
    updateProjects: [],
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
      project.updateProjects = action.payload
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

export const updateProject = (data, userid) => {
  // console.log('UpdateProject.....', data)
  return apiCallBegan({
    url: `employeeProject/addEmployeeProjectadd/user/${userid}`,
    method: 'POST',
    data,
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
}
