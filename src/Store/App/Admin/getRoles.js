import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'get-Roles',
  initialState: {
    roles: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (roles) => {
      roles.loading = true
      roles.message = ''
    },
    success: (roles, action) => {
      roles.loading = false
      roles.message = ''
      roles.roles = action.payload
    },
    failed: (roles, action) => {
      roles.loading = false
      roles.message = action.payload.message
    },
    reset: (roles, action) => {
      roles.loading = false
      roles.message = ''
    },
    editSucess: (roles, action) => {
      roles.loading = false
      roles.message = ''
      roles.roles.push(action.payload)
    },
  },
})

const {requested, success, failed, reset, editSucess} = slice.actions
export default slice.reducer

export const getRoles = () =>
  apiCallBegan({
    url: `admin/api/roles/list`,
    method: 'GET',
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  })

export const addRoles = (id, data) =>
  apiCallBegan({
    url: `admin/api/roles/add/${id}`,
    method: 'POST',
    data,
    onStart: requested.type,
    onSuccess: editSucess.type,
    onFailed: failed.type,
  })
                                                                                                                                                                                                                                                    
export const editRoles = (id, data) =>
  apiCallBegan({
    url: `admin/api/roles/edit/${id}`,
    method: 'PUT',
    data,
    onStart: requested.type,
    onSuccess: editSucess.type,
    onFailed: failed.type,
  })

  export const deleteRoles = (id, data) =>
  apiCallBegan({
    url: `admin/api/roles/delete/${id}`,
    method: 'DELETE',
    data,
    onStart: requested.type,
    onSuccess: editSucess.type,
    onFailed: failed.type,
  })
