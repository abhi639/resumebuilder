// api/technologies/add

import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'
import {id} from 'date-fns/locale'

const slice = createSlice({
  name: 'delete-projects',
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
      projects.message = ''
      projects.deleteProject = action.payload
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

export const deleteEmployeeProject = (proj_id) =>
  apiCallBegan({
    url: `employeeProject/DeleteempProjectbyid/${proj_id}`,
    method: 'POST',
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
