// api/technologies/add

import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'
import {id} from 'date-fns/locale'

const slice = createSlice({
  name: 'get-projects',
  initialState: {
    project: [],
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
      projects.project = action.payload
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

export const getProjects = () =>
  apiCallBegan({
    url: `project/getProjects`,
    method: 'GET',
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
