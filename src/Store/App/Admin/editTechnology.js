// api/technologies/edit

import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'edit-Technology',
  initialState: {
    editTechnology: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (technology) => {
      technology.loading = true
      technology.message = ''
    },
    success: (technology, action) => {
      technology.loading = false
      technology.message = ''
      technology.technology = action.payload
    },
    failed: (technology, action) => {
      technology.loading = false
      technology.message = action.payload.message
    },
    reset: (technology, action) => {
      technology.loading = false
      technology.message = ''
    },
  },
})

const {requested, success, failed, reset} = slice.actions
export default slice.reducer

export const editTechnology = (data) =>
  apiCallBegan({
    url: `api/technologies/edit`,
    method: 'POST',
    data,
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })
