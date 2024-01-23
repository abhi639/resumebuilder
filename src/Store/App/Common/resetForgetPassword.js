// api/technologies/add

import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'reset-Forget -Password',
  initialState: {
    passwordReset: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (password) => {
      password.loading = true
      password.message = ''
    },
    success: (password, action) => {
      password.loading = false
      password.message = ''
      password.passwordReset = action.payload
    },
    failed: (password, action) => {
      password.loading = false
      password.message = action.payload.message
    },
    reset: (password, action) => {
      password.loading = false
      password.message = ''
    },
  },
})

const {requested, success, failed, reset} = slice.actions
export default slice.reducer

export const resetForgetPassword = (token, data) => {
  console.log('Data received in resetPassword:', data, token)
  return apiCallBegan({
    url: `auth/resetPassword?token=${token}`,
    method: 'POST',
    data,
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
}
