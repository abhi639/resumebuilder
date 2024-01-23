// api/technologies/add

import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'get-managerActivity',
  initialState: {
    managerActivities: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (managerActivity) => {
      managerActivity.loading = true
      managerActivity.message = ''
    },
    success: (managerActivity, action) => {
      managerActivity.loading = false
      managerActivity.message = ''
      managerActivity.managerActivities = action.payload
    },
    failed: (managerActivity, action) => {
      managerActivity.loading = false
      managerActivity.message = action.payload.message
    },
    reset: (managerActivity, action) => {
      managerActivity.loading = false
      managerActivity.message = ''
    },
  },
})

const {requested, success, failed, reset} = slice.actions
export default slice.reducer

export const getAllManagerActivityHistory = (userId) =>
  apiCallBegan({
    url: `api/activty/byUser/${userId}`,
    method: 'GET',
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
