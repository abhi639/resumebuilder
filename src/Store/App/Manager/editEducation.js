  // edit/employee

  import {createSlice} from '@reduxjs/toolkit'
  import {apiCallBegan} from '../../../middleware/actions.js'

  const slice = createSlice({
    name: 'edit-education',
    initialState: {
      editeducation: [],
      loading: false,
      message: '',
    },
    reducers: {
      requested: (educationdetail) => {
        educationdetail.loading = true
        educationdetail.message = ''
      },
      success: (educationdetail, action) => {
        educationdetail.loading = false
        educationdetail.message = ''
        educationdetail.editeducation = action.payload
      },
      failed: (educationdetail, action) => {
        educationdetail.loading = false
        educationdetail.message = action.payload.message
      },
      reset: (educationdetail, action) => {
        educationdetail.loading = false
        educationdetail.message = ''
      },
    },
  })

  const {requested, success, failed, reset} = slice.actions
  export default slice.reducer

  export const editeducationdetails = (educationId, data) => {
    console.log('Data received in editeducationdetail:', educationId, data) // Add this line to log the data
    return apiCallBegan({
      url: `/editEducation/${educationId}`,
      method: 'PUT',
      data,
      onStart: requested.type,
      onSuccess: success.type,
      onFailed: failed.type,
    })
  }
