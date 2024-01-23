// api/education/delete

import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'delete-Education',
  initialState: {
    deleteeducations: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (education) => {
      education.loading = true
      education.message = ''
    },
    success: (education, action) => {
      education.loading = false
      education.message = ''
      education.deleteeducations = action.payload
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

export const deleteeducations = (educationId) => {
  console.log('Data received in deleteeducations:', educationId) // Add this line to log the data
  return apiCallBegan({
    url: `deleteEducation/${educationId}`,
    method: 'DELETE',
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
}
