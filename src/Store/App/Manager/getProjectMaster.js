// api/technologies/getProjectMaster

import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../../../middleware/actions.js';

const slice = createSlice({
    name: 'getProjectMaster',
    initialState: {
      project: [],  // Make sure this property is defined
      loading: false,
      message: '',
    },
  reducers: {
    requested: (state) => {
      state.loading = true;
      state.message = '';
    },
    success: (state, action) => {
      state.loading = false;
      state.message = '';
      state.projectMaster = action.payload;
    },
    failed: (state, action) => {
        state.loading = false;
        state.message = action.payload.message || 'Failed to fetch data';
      },
    reset: (state) => {
      state.loading = false;
      state.message = '';
    },
  },
});

const { requested, success, failed, reset } = slice.actions;
export default slice.reducer;

export const getProjectMaster = () =>
  apiCallBegan({
    url: 'project/getProjects',
    method: 'GET',
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  });
