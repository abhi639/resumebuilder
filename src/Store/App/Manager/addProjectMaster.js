import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../../../middleware/actions.js';

const slice = createSlice({
  name: 'addProjectmaster',
  initialState: {
    addProjectmaster: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (projectmaster) => {
      projectmaster.loading = true;
      projectmaster.message = '';
    },
    success: (projectmaster, action) => {
      projectmaster.loading = false;
      projectmaster.message = '';
      projectmaster.addProjectmaster = action.payload;
    },
    failed: (projectmaster, action) => {
      projectmaster.loading = false;
      projectmaster.message = action.payload.message;
    },
    reset: (projectmaster) => {
      projectmaster.loading = false;
      projectmaster.message = '';
    },
  },
});

const { requested, success, failed, reset } = slice.actions;
export default slice.reducer;

export const addProjectmaster = (data) => {
  console.log("Addprojectdetails",data)
  return apiCallBegan({
    url: `project/add`,
    method: 'POST',
    data,
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  });
};
