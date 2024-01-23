// api/technologies/add


import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from '../../../middleware/actions.js';

const slice = createSlice({
  name: 'get-activity',
  initialState: {
    activities: [],
    loading: false,
    message: '',
  },
  reducers: {
    requested: activity => {
      activity.loading = true;
      activity.message = '';
    },
    success: (activity, action) => {
      activity.loading = false;
      activity.message = '';
      activity.activities = action.payload
    },
    failed: (activity, action) => {
      activity.loading = false;
      activity.message = action.payload.message;
    },
    reset: (activity, action) => {
      activity.loading = false;
      activity.message = '';
    },
  },
});

const {requested, success, failed, reset} = slice.actions;
export default slice.reducer;

export const getActivity = (data) =>
  apiCallBegan({
    url: `api/activty/list`,
    method: 'GET',
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  });

