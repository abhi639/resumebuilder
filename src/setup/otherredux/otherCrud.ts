import axios from 'axios'; // Import Axios or your preferred HTTP client library


const API_URL = process.env.REACT_APP_API_URL || 'api'

// Action types
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

// Action creators

// Action creator for fetching users from the backend
export const fetchUsersSuccess = (users: any) => ({
  type: FETCH_USERS_SUCCESS,
  users,
});

// Action creator for adding a new user
export const addUserSuccess = (user: any) => ({
  type: ADD_USER_SUCCESS,
  user,
});

// Action creator for updating a user
export const updateUserSuccess = (user: any) => ({
  type: UPDATE_USER_SUCCESS,
  user,
});

// Action creator for deleting a user
export const deleteUserSuccess = (userId: any) => ({
  type: DELETE_USER_SUCCESS,
  userId,
});

//  action creator for fetching users from the backend
export const fetchUsers = () => {
  return async (dispatch: (arg0: { type: string; users: any; }) => void) => {
    try {
      const response = await axios.get('/api/fetch'); 
      const users = response.data;
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      // Handle error, e.g., dispatch an error action
      console.error('Error fetching users:', error);
    }
  };
};

// action creator for adding a new user
export const addUser = (user: any) => {
  return async (dispatch: (arg0: { type: string; user: any; }) => void) => {
    try {
      const response = await axios.post('/api/add', user); 
      const addedUser = response.data;
      dispatch(addUserSuccess(addedUser));
    } catch (error) {
      // Handle error, e.g., dispatch an error action
      console.error('Error adding user:', error);
    }
  };
};

// action creator for updating a user
export const updateUser = (user: { id: any; }) => {
  return async (dispatch: (arg0: { type: string; user: any; }) => void) => {
    try {
      const response = await axios.put(`/api/edit/${user.id}`, user); 
      const updatedUser = response.data;
      dispatch(updateUserSuccess(updatedUser));
    } catch (error) {
      // Handle error, e.g., dispatch an error action
      console.error('Error updating user:', error);
    }
  };
};

//  action creator for deleting a user
export const deleteUser = (userId: any) => {
  return async (dispatch: (arg0: { type: string; userId: any; }) => void) => {
    try {
      await axios.delete(`/api/delete/${userId}`); 
      dispatch(deleteUserSuccess(userId));
    } catch (error) {
      // Handle error, e.g., dispatch an error action
      console.error('Error deleting user:', error);
    }
  };
};
