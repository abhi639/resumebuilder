// edit/project

import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../../../middleware/actions.js';

const slice = createSlice({
  name: 'edit-project-master',
  initialState: {
    editProjectMaster: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: (projectDetails) => {
      projectDetails.loading = true;
      projectDetails.message = '';
    },
    success: (projectDetails, action) => {
      projectDetails.loading = false;
      projectDetails.message = '';
      projectDetails.editProjectMaster = action.payload;
    },
    failed: (projectDetails, action) => {
      projectDetails.loading = false;
      projectDetails.message = action.payload.message;
    },
    reset: (projectDetails) => {
      projectDetails.loading = false;
      projectDetails.message = '';
    },
  },
});

const { requested, success, failed, reset } = slice.actions;
export default slice.reducer;

export const editProjectMasterDetails = (projectId, data) => {
  console.log('Data received in editProjectMasterDetails:', projectId, data);
  return apiCallBegan({
    url: `project/updateProject/${projectId}`,
    method: 'PUT',
    data,
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  });
};
