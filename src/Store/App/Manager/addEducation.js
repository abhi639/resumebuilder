import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../middleware/actions.js'

const slice = createSlice({
  name: 'add-Education',
  initialState: {
    addEducation: [],
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
      education.addEducation = action.payload
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

// export const addEducation = (data) => {
//     console.log('Data received in addEducation:', data); // Add this line to log the data
//     return (() => {
//       apiCallBegan({
//         url: '/education/add', // Adjust the URL based on your backend configuration
//         method: 'POST',
//         data,
//         onStart: 'requested',
//         onSuccess: (response) => resolve(response),
//         onFailed: (error) => reject(error),
//       });
//     });
//   };

  export const addEducation = (data) => {
    // console.log('UpdateProject.....', data)
    return apiCallBegan({
      url: `education/add`,
      method: 'POST',
      data,
      onStart: requested.type,
      onSuccess: success.type,
      onFailed: failed.type,
    })
  }
