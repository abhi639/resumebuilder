
import {createSlice} from '@reduxjs/toolkit';
// import {apiCallBegan} from '../../middleware/actions.js';

const slice = createSlice({
  name: 'login',
  initialState: {
    accessToken: null,
    loading: false,
    message: '',
    user:null,
  },
  reducers: {
    requested: login => {
      login.loading = true;
      login.message = '';
    },
    success: (login, action) => {
      login.loading = false;
      login.message = '';
      login.user = action.payload
    },
    failed: (login, action) => {
      login.loading = false;
      login.message = action.payload.message;
    },
    reset: (login, action) => {
      login.loading = false;
      login.message = '';
      login.accessToken = null;
      login.user = null;
    },
    setToken: (login, action) => {
        login.loading = false;
        login.message = '';
        login.accessToken = action.payload
      },
  },
});

const {requested, success, failed, reset,setToken} = slice.actions;


export default slice.reducer;

export const setAccessToken =(token)=>async dispatch => {
    dispatch(setToken(token))

}

export const setUser =(user)=>async dispatch => {
    dispatch(success(user))
}

export const logout =()=>async dispatch => {
    dispatch(reset())
}

// export const getRoles = () =>
//   apiCallBegan({
//     url: `admin/api/roles/list`,
//     method: 'GET',
//     onStart: requested.type,
//     onSuccess: success.type,
//     onFailed: failed.type,
//   });

