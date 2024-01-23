// api/technologies/add


import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from '../../../middleware/actions.js';

const slice = createSlice({
  name: 'edit-Role',
  initialState: {
    editroles: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: role => {
      role.loading = true;
      role.message = '';
    },
    success: (role, action) => {
      role.loading = false;
      role.message = '';
      role.editroles = action.payload
    },
    failed: (role, action) => {
      role.loading = false;
      role.message = action.payload.message;
    },
    reset: (role, action) => {
      role.loading = false;
      role.message = '';
    },
  },
});

const {requested, success, failed, reset} = slice.actions;
export default slice.reducer;

export const editroles = (data) => {
    console.log("Data received in editroles:", data); // Add this line to log the data
    return apiCallBegan({
      url: `admin/api/roles/edit`,
      method: 'PUT',
      data,
      onStart: requested.type,
      onSuccess: success.type,
      onFailed: failed.type,
    });
  };
