// getProjectMasterById.js

import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'get-project-master-by-id',
  initialState: {
    projectMaster: null,
    loading: false,
    error: null,
  },
  reducers: {
    requested: (state) => {
      state.loading = true
      state.error = null
    },
    success: (state, action) => {
      state.loading = false
      state.projectMaster = action.payload
    },
    failed: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    reset: (state) => {
      state.loading = false
      state.projectMaster = null
      state.error = null
    },
  },
})

const {requested, success, failed, reset} = slice.actions
export default slice.reducer

export const getProjectMasterById = (projectId) => {
  return apiCallBegan({
    url: `project/getByid/${projectId}`,
    method: 'GET',
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
}
