// api/technologies/add


import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from '../../../middleware/actions.js';

const slice = createSlice({
  name: 'add-Technology',
  initialState: {
    technology: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: technology => {
      technology.loading = true;
      technology.message = '';
    },
    success: (technology, action) => {
      technology.loading = false;
      technology.message = '';
      technology.technology = action.payload
    },
    failed: (technology, action) => {
      technology.loading = false;
      technology.message = action.payload.message;
    },
    reset: (technology, action) => {
      technology.loading = false;
      technology.message = '';
    },
  },
});

const {requested, success, failed, reset} = slice.actions;
export default slice.reducer;

export const addTechnology = (data) => {
  console.log("Data received in addtechnologies:", data); // Add this line to log the data
  return apiCallBegan({
    url: `api/technologies/add`,
    method: 'POST',
    data,
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  });
};

