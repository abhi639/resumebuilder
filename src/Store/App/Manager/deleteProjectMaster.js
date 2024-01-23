// deleteProjectMaster.js

import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'deleteProjectMaster',
  initialState: {
    deleteProject: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (projects) => {
      projects.loading = true
      projects.message = ''
    },
    success: (projects, action) => {
      projects.loading = false
      projects.message = 'Project deleted successfully'
      projects.deleteProject = action.payload

      // Reset the state to initial values
      projects.deleteProject = []
      projects.loading = false
      projects.message = ''
    },
    failed: (projects, action) => {
      projects.loading = false
      projects.message = action.payload.message
    },
    reset: (projects, action) => {
      projects.loading = false
      projects.message = ''
    },
  },
})

const {requested, success, failed, reset} = slice.actions
export default slice.reducer

export const deleteProjectMaster = (projectId) => {
  console.log('Data received in deleteprojectmaster:' + projectId)
  apiCallBegan({
    url: `project/delete/${projectId}`,
    method: 'POST',
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
}
//   export const deleteeducations = (educationId) => {
//     console.log('Data received in deleteeducations:', educationId) // Add this line to log the data
//     return apiCallBegan({
//       url: `deleteEducation/${educationId}`,
//       method: 'DELETE',
//       onStart: requested.type,
//       onSuccess: success.type,
//       onFailed: failed.type,
//     })
//   }
