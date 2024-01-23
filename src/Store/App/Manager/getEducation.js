// api/education/add.js

import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'get-education',
  initialState: {
    educationData: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (education, action) => {
      education.loading = true
      education.message = ''
    },
    success: (education, action) => {
      education.loading = false
      education.message = ''
      education.educationData = action.payload
    },
    failed: (education, action) => {
      education.loading = false
      education.message = action.payload.message
    },
    reset: (education, action) => {
      education.loading = false
      education.message = ''
    },
  },
})

const {requested, success, failed, reset} = slice.actions
export default slice.reducer

export const getEducation = (userId) =>
  apiCallBegan({
    url: `educationList/${userId}`,
    method: 'GET',
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
