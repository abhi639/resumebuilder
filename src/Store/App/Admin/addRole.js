// api/technologies/add


import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from '../../../middleware/actions.js';

const slice = createSlice({
  name: 'add-Role',
  initialState: {
    addroles: [],
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
      role.addroles = action.payload
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

export const addroles = (data) => {
    console.log("Data received in addroles:", data); // Add this line to log the data
    return apiCallBegan({
      url: `admin/api/roles/add`,
      method: 'POST',
      data,
      onStart: requested.type,
      onSuccess: success.type,
      onFailed: failed.type,
    });
  };
