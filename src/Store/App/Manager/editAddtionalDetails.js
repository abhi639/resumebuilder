// edit/employee

import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'edit-addtionalDetails',
  initialState: {
    editaddtionaldetails: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (addtionalDetails) => {
      addtionalDetails.loading = true
      addtionalDetails.message = ''
    },
    success: (addtionalDetails, action) => {
      addtionalDetails.loading = false
      addtionalDetails.message = ''
      addtionalDetails.editaddtionaldetails = action.payload
    },
    failed: (addtionalDetails, action) => {
      addtionalDetails.loading = false
      addtionalDetails.message = action.payload.message
    },
    reset: (addtionalDetails, action) => {
      addtionalDetails.loading = false
      addtionalDetails.message = ''
    },
  },
})

const {requested, success, failed, reset} = slice.actions
export default slice.reducer

export const editaddtionaldetails = (id, data) => {
  console.log('Data received in editaddtionalDetails:', id,data) // Add this line to log the data
  return apiCallBegan({
    url: `edit/employee/${id}`,
    method: 'PUT',
    data,
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
}
