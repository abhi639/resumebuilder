// api/education/delete

import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'add-profileImage',
  initialState: {
    addProfileimage: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (profileImage) => {
      profileImage.loading = true
      profileImage.message = ''
    },
    success: (profileImage, action) => {
      profileImage.loading = false
      profileImage.message = ''
      profileImage.addProfileimage = action.payload
    },
    failed: (profileImage, action) => {
      profileImage.loading = false
      profileImage.message = action.payload.message
    },
    reset: (profileImage, action) => {
      profileImage.loading = false
      profileImage.message = ''
    },
  },
})

const {requested, success, failed, reset} = slice.actions
export default slice.reducer

export const addProfileImage = (data, userId) => {
  console.log('data',data)
  return apiCallBegan({
    url: `/uploadImage/${userId}`,
    method: 'POST',
    data,
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
}
